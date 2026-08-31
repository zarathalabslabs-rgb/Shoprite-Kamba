export interface Category {
  id: string;
  nome: string;
  slug: string;
  imagem_url?: string;
  ordem?: number;
}

export interface Product {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  preco: number; // in Kz
  preco_promocional?: number; // in Kz
  stock: number;
  unidade_medida: string; // e.g., "Fardo de 25kg", "Caixa c/ 12 un", "Pack c/ 24"
  categoria_id: string;
  categoria_nome?: string;
  imagem_url: string;
  destaque: boolean;
  activo: boolean;
  origem: string; // "Angola", "Portugal", "África do Sul", "China", "EUA", "Brasil"
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'multicaixa_express' | 'unitel_money' | 'paypay_ao' | 'cash';
export type PaymentOption = 'avista' | 'parcelar' | 'entrega';
export type OrderStatus = 
  | 'pendente' 
  | 'comprovativo_recebido' 
  | 'confirmada' 
  | 'em_preparacao' 
  | 'enviada' 
  | 'entregue' 
  | 'cancelada';

export interface OrderItem {
  id?: string;
  encomenda_id?: string;
  produto_id: string;
  nome_produto: string;
  preco_unitario: number;
  quantidade: number;
  subtotal: number;
  imagem_url?: string;
}

export interface Order {
  id: string;
  codigo_unico: string;
  cliente_nome: string;
  cliente_idade: number;
  cliente_whatsapp: string;
  cliente_email: string;
  provincia: string;
  municipio: string;
  bairro_rua: string;
  observacoes?: string;
  
  metodo_pagamento: PaymentMethod;
  opcao_pagamento: PaymentOption;
  numero_parcelas: number; // 1, 2 or 3
  taxa_parcelamento_percent: number; // 5%
  
  valor_produtos: number; // Base subtotal
  valor_taxa: number; // 5% if parcelado, 0 otherwise
  valor_entrada: number; // 25% if entrega, 0 otherwise
  valor_restante: number; // 75% if entrega, 0 otherwise
  valor_total: number; // Final total to pay
  valor_prestacao: number; // Total with fee / installments
  
  estado: OrderStatus;
  comprovativo_url?: string;
  data_confirmacao?: string; // ISO string when admin confirms, starts 96h timer
  notas_admin?: string;
  itens: OrderItem[];
  created_at: string;
  updated_at?: string;
}