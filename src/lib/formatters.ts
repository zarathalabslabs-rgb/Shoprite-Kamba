export const WHATSAPP_SELLER_NUMBER = "244950776148";
export const WHATSAPP_SELLER_DISPLAY = "+244 950 776 148";

// Format Kwanzas with standard spacing (e.g., 45.000,00 Kz)
export function formatKz(amount: number): string {
  return new Intl.NumberFormat('pt-AO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' Kz';
}

// Generate complex unique order code (e.g., SK-8F2K-9X4M-Q3T7)
export function generateUniqueOrderCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const getChunk = (len = 4) => {
    let res = '';
    for (let i = 0; i < len; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  };
  const timeHex = Date.now().toString(36).toUpperCase().slice(-3);
  return `SK-${getChunk(3)}${timeHex.slice(0, 1)}-${getChunk(4)}-${getChunk(4)}`;
}

// Payment Methods details
export const PAYMENT_METHODS_INFO = {
  multicaixa_express: {
    nome: "Multicaixa Express",
    numero: "922 330 090",
    instrucoes: "Efetue a transferência ou pagamento de serviço para o número de telemóvel 922 330 090 via Multicaixa Express.",
    badge: "Mais Rápido",
  },
  unitel_money: {
    nome: "Unitel Money",
    entidade: "00930",
    numero: "922 330 090",
    instrucoes: "Abra a sua aplicação Unitel Money ou marque *449#, selecione Pagamentos com Entidade 00930 e número 922 330 090.",
    badge: "Unitel",
  },
  paypay_ao: {
    nome: "PayPay Ao",
    numero: "922 330 090",
    instrucoes: "Transfira diretamente para a conta PayPay Ao associada ao telemóvel 922 330 090.",
    badge: "Digital",
  },
  cash: {
    nome: "Cash (Presencial)",
    numero: "No balcão / Armazém central",
    instrucoes: "Disponível exclusivamente para recolha presencial no armazém central. Pagamento de sinal prévio pode ser solicitado.",
    badge: "Recolha",
  },
};

export const PROVINCIAS_ANGOLA = [
  "Luanda",
  "Benguela",
  "Huíla",
  "Huambo",
  "Cabinda",
  "Cuanza Sul",
  "Cuanza Norte",
  "Uíge",
  "Zaire",
  "Malanje",
  "Lunda Norte",
  "Lunda Sul",
  "Moxico",
  "Namibe",
  "Cunene",
  "Bié",
  "Cuando Cubango",
  "Bengo"
];

// WhatsApp direct chat URL helper
export function createWhatsAppLink(message: string, phone = WHATSAPP_SELLER_NUMBER): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Calculate remaining hours and minutes for the 96h (4 business days) countdown
export function calculateDeliveryCountdown(dataConfirmacaoStr?: string) {
  if (!dataConfirmacaoStr) {
    return {
      active: false,
      hours: 96,
      minutes: 0,
      seconds: 0,
      totalSecondsRemaining: 96 * 3600,
      isExpired: false,
      progressPercent: 0,
    };
  }

  const confirmTime = new Date(dataConfirmacaoStr).getTime();
  const maxDeliveryDurationMs = 96 * 60 * 60 * 1000; // 96 hours
  const deadline = confirmTime + maxDeliveryDurationMs;
  const now = Date.now();
  const diffMs = deadline - now;

  if (diffMs <= 0) {
    return {
      active: true,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSecondsRemaining: 0,
      isExpired: true,
      progressPercent: 100,
    };
  }

  const totalSecondsRemaining = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSecondsRemaining / 3600);
  const minutes = Math.floor((totalSecondsRemaining % 3600) / 60);
  const seconds = totalSecondsRemaining % 60;
  
  const elapsedMs = now - confirmTime;
  const progressPercent = Math.min(100, Math.max(0, (elapsedMs / maxDeliveryDurationMs) * 100));

  return {
    active: true,
    hours,
    minutes,
    seconds,
    totalSecondsRemaining,
    isExpired: false,
    progressPercent,
  };
}