export interface PartnersProps {
  _id: string;
  endereco: string;
  facebook_url: string;
  image: string;
  imageURL: string;
  name: string;
  telefone: string;
  text: string;
  whatsapp_url: string;
  paymentDay: number;
  active: boolean;
}

export interface PartnerHighlightProps {
  _id: string;
  imageURL: string;
  partner: string;
  text: string;
  title: string;
  summary: string;
  videoURL: string;
}
