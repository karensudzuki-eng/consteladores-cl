import { NextRequest, NextResponse } from "next/server";
import { registerTherapistApplication } from "@/app/actions/therapists";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const result = await registerTherapistApplication(formData);

    if (!result || !result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result?.error || "No se pudo registrar la postulación en este momento.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      therapistId: result.therapistId,
    });
  } catch (error: any) {
    console.error("Error en API /api/therapist/register:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Ocurrió un error en el servidor al procesar la postulación. Por favor verifica los datos o intenta nuevamente.",
      },
      { status: 500 }
    );
  }
}
