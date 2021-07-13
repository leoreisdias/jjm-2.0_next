import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { parseCookies } from 'nookies';

import { api } from '../services/api';
import { Container, ListItem, ListItemButtonContainer } from '../styles/pages/Partners';
import { formOptions } from '../types/formOptions';
import { PartnersProps } from '../types/interfaces/Partners';

interface PartnersServer {
  partnersList: PartnersProps[];
}

export default function Partners({ partnersList }: PartnersServer) {
  async function handleDisablePartner(id: string) {
    try {
      await api.patch(`/partners/${id}`, {
        active: false,
      });
    } catch (err) {
      //...
    }
  }

  return (
    <Container>
      <h3>Parceiros Cadastrados</h3>
      <ul>
        {partnersList &&
          partnersList.map((partner) => {
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
                    <button
                      type="button"
                      className={partner.active ? 'active' : ''}
                      onClick={() => handleDisablePartner(partner._id)}
                    >
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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { token } = parseCookies(ctx);

  try {
    const { data } = await api.get('/fullpartners', {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    const partnersList = data.sort((item) => item.active);
    console.log(partnersList);

    return {
      props: {
        partnersList,
      },
    };
  } catch (err) {
    console.log(err);
    // return {
    //   redirect: {
    //     destination: '/',
    //     permanent: false,
    //   },
    // };
  }
};
