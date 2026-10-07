export interface LeadNotificationPayload {
  nome: string;
  contato: string;
  motivo: string;
}

/**
 * Notifica o psicólogo sobre um novo lead.
 *
 * TODO: integrar com um serviço transacional real (Resend ou SendGrid —
 * decisão pendente, ver CLAUDE.md > Stack decidida > Envio de email).
 * Por enquanto só loga no console pra não travar o fluxo de gravação do lead.
 */
export async function sendLeadNotification(payload: LeadNotificationPayload) {
  console.log("[email] Novo lead recebido (notificação por email ainda não implementada):", payload);
}
