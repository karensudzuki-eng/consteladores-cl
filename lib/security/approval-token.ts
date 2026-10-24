import crypto from "crypto";

export function generateApprovalToken(therapistId: string): string {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY || "consteladores-admin-secret-key-2026";
  return crypto.createHmac("sha256", secret).update(therapistId).digest("hex");
}
