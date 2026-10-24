import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cliente con SERVICE_ROLE_KEY para operaciones seguras desde el servidor
// que requieren privilegios de administración (bypass de RLS para flujos de sistema).
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  try {
    return createSupabaseClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  } catch (err) {
    console.error("Error al inicializar cliente Supabase Admin:", err);
    return null;
  }
}
