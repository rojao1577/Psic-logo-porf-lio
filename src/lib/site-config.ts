// Dados placeholder do psicólogo — o usuário vai fornecer o conteúdo real
// depois (ver plano: "esqueleto do site"). Centralizado aqui pra trocar fácil.
export const siteConfig = {
  nomePsicologo: "[Nome do Psicólogo]",
  crp: "[CRP 00/00000]",
  especialidade: "[Especialidade — ex: Psicologia Clínica]",
  cidade: "[Cidade]",

  whatsappNumero: "5500000000000", // formato internacional, só dígitos
  whatsappMensagemPadrao:
    "Olá! Vim pelo site e gostaria de saber mais sobre o atendimento.",

  instagramHandle: "@[instagram]",
  instagramUrl: "https://instagram.com/",

  endereco: {
    local: "[Nome da clínica/consultório]",
    rua: "[Rua, número]",
    bairro: "[Bairro]",
    cidadeUf: "[Cidade] - [UF]",
    cep: "[CEP]",
  },
} as const;

export function buildWhatsAppLink(message: string = siteConfig.whatsappMensagemPadrao) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumero}?text=${text}`;
}
