import { FaWhatsapp, FaFacebook } from 'react-icons/fa';

import { PartnersProps } from '../../types/interfaces/Partners';
import {
  PartnerDetailContainer,
  Title,
  Content,
  Links,
  WhatsAppButton,
  FacebookButton,
} from './PartnerDetailsStyle';

interface PartnerDetailsProps {
  partner: PartnersProps;
}
const wppMsg = 'Olá! Vi vocês pelo JJM.';

export const PartnerDetails = ({ partner }: PartnerDetailsProps) => {
  const whatsApp = partner.whatsapp_url
    ? `https://api.whatsapp.com/send?phone=55${partner.whatsapp_url}&text=${wppMsg}`
    : null;

  return (
    <PartnerDetailContainer>
      <Title>{partner.name}</Title>
      <Content>
        <p
          dangerouslySetInnerHTML={{
            __html: partner.text,
          }}
        />
        <span>
          <p>
            <strong>Endereço: </strong> {partner.endereco}
          </p>
          <p>
            <strong>Telefone: </strong> {partner.telefone}
          </p>
        </span>
      </Content>
      <Links>
        {partner.whatsapp_url && (
          <a href={whatsApp} target="_blank" rel="noreferrer">
            <WhatsAppButton type="button">
              <FaWhatsapp /> WhatsApp
            </WhatsAppButton>
          </a>
        )}
        {partner.facebook_url && (
          <a href={partner.facebook_url} target="_blank" rel="noreferrer">
            <FacebookButton type="button">
              <FaFacebook /> Facebook
            </FacebookButton>
          </a>
        )}
      </Links>
    </PartnerDetailContainer>
  );
};
