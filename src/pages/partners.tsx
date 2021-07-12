import { useEffect, useState, useCallback } from 'react';

import Link from 'next/link';

import { api } from '../services/api';
import { Container, ListItem, ListItemButtonContainer } from '../styles/pages/Partners';
import { formOptions } from '../types/formOptions';
import { PartnersProps } from '../types/interfaces/Partners';

export default function Partners() {
  const [partners, setPartners] = useState<PartnersProps[]>();

  const loadPartners = useCallback(async () => {
    try {
      const { data } = await api.get('/partners');
      console.log(data);

      setPartners(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadPartners();
  }, [loadPartners]);

  return (
    <Container>
      <ul>
        {partners &&
          partners.map((partner) => {
            return (
              <Link
                href={`/writer-area?update=${formOptions.partners}&id=${partner._id}`}
                key={partner._id}
              >
                <ListItem>
                  <strong>{partner.name}</strong>
                  <span>
                    Vencimento dia
                    <strong>{partner.paymentDay}</strong>
                  </span>
                  <ListItemButtonContainer>
                    <button type="button" className={partner.active ? 'active' : ''}>
                      {partner.active ? 'Desativar' : 'Ativar'}
                    </button>
                    <button type="button">Editar</button>
                  </ListItemButtonContainer>
                </ListItem>
              </Link>
            );
          })}
      </ul>
    </Container>
  );
}
