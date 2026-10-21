-- ==============================================================================
-- CONSTELADORES.CL - ESQUEMA DE BASE DE DATOS SUPABASE
-- ==============================================================================
-- Este script crea las tablas, tipos de datos, disparadores (triggers),
-- políticas de seguridad a nivel de fila (RLS) y configuración de Storage.
-- ==============================================================================

-- 1. TIPOS ENUMERADOS (ROLES Y ESTADOS)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('client', 'constelador', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE therapist_status AS ENUM ('pending_approval', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE appointment_status AS ENUM ('pending_payment', 'confirmed', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. TABLA DE PERFILES (Vinculada a auth.users de Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'client',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABLA DE TERAPEUTAS / CONSTELADORES FAMILIARES
CREATE TABLE IF NOT EXISTS public.constellation_therapists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    headline TEXT NOT NULL DEFAULT 'Facilitador en Constelaciones Familiares',
    bio TEXT NOT NULL, -- Narrativa personal, humana y sin tecnicismos fríos
    approach TEXT NOT NULL, -- Linaje o escuela formativa (ej. Hellinger Sciencia, Gestalt Sistémica)
    experience_years INTEGER NOT NULL DEFAULT 1,
    price_clp INTEGER NOT NULL DEFAULT 40000, -- Valor de sesión en CLP (Pesos Chilenos)
    duration_minutes INTEGER NOT NULL DEFAULT 75, -- Duración habitual (60 a 90 min)
    certification_url TEXT NOT NULL, -- URL del certificado almacenado en Supabase Storage
    certification_verified_at TIMESTAMPTZ,
    status therapist_status NOT NULL DEFAULT 'pending_approval',
    rejection_reason TEXT,
    location TEXT NOT NULL DEFAULT 'Online en todo Chile y el mundo',
    modalities TEXT[] NOT NULL DEFAULT ARRAY['Online (Google Meet)'],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABLA DE CITAS / RESERVAS
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    therapist_id UUID NOT NULL REFERENCES public.constellation_therapists(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status appointment_status NOT NULL DEFAULT 'pending_payment',
    meet_link TEXT, -- Enlace único de Google Meet
    payment_id TEXT, -- Identificador de la pasarela de pago (Flow, Mercado Pago o Stripe)
    amount_paid_clp INTEGER,
    consultation_motive TEXT, -- Breve nota o motivo que el consultante quiera traer
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. TRIGGER AUTOMÁTICO: Crear perfil al registrarse un usuario en auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    default_role user_role := 'client';
    assigned_name TEXT;
BEGIN
    -- Si en los metadatos viene el rol asignado (ej. al registrarse como terapeuta)
    IF NEW.raw_user_meta_data->>'role' = 'constelador' THEN
        default_role := 'constelador';
    END IF;

    assigned_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));

    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (NEW.id, NEW.email, assigned_name, default_role)
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = EXCLUDED.full_name;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. SEGURIDAD A NIVEL DE FILA (ROW LEVEL SECURITY - RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.constellation_therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Políticas para Profiles
CREATE POLICY "Lectura pública de perfiles básicos"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Políticas para Constellation Therapists
-- Cualquiera puede ver terapeutas APROBADOS en la landing pública
CREATE POLICY "Terapeutas aprobados son visibles para todos"
    ON public.constellation_therapists FOR SELECT
    USING (
        status = 'approved' 
        OR (auth.uid() = user_id)
        OR EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- El terapeuta puede postular su propio perfil
CREATE POLICY "Terapeutas pueden crear y editar su postulación"
    ON public.constellation_therapists FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Terapeutas pueden actualizar su propio perfil"
    ON public.constellation_therapists FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Solo administradores pueden cambiar el estado de validación (status)
CREATE POLICY "Administradores pueden actualizar cualquier terapeuta"
    ON public.constellation_therapists FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Políticas para Citas (Appointments)
-- Consultantes pueden ver sus citas
CREATE POLICY "Consultantes pueden ver sus propias citas"
    ON public.appointments FOR SELECT
    TO authenticated
    USING (
        client_id = auth.uid()
        OR client_email = (SELECT email FROM public.profiles WHERE id = auth.uid())
    );

-- Terapeutas pueden ver las citas agendadas con ellos
CREATE POLICY "Terapeutas ven sus citas reservadas"
    ON public.appointments FOR SELECT
    TO authenticated
    USING (
        therapist_id IN (
            SELECT id FROM public.constellation_therapists WHERE user_id = auth.uid()
        )
    );

-- Permitir creación de citas desde el proceso de reserva
CREATE POLICY "Cualquiera puede iniciar una reserva"
    ON public.appointments FOR INSERT
    WITH CHECK (true);

-- 7. STORAGE DE SUPABASE PARA CERTIFICADOS
-- Crear el bucket de certificaciones si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('certifications', 'certifications', false)
ON CONFLICT (id) DO NOTHING;

-- Política de subida de certificaciones: solo terapeutas autenticados
CREATE POLICY "Terapeutas pueden subir sus certificados"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'certifications');

-- Política de lectura de certificados: solo el dueño y administradores
CREATE POLICY "Dueño del certificado y admin pueden leer el archivo"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (
        bucket_id = 'certifications'
        AND (
            auth.uid()::text = (storage.foldername(name))[1]
            OR EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
            )
        )
    );
