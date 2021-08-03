import { useState } from 'react';

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { parseCookies } from 'nookies';

import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Container, ListItem, ListItemButtonContainer } from '../styles/pages/Partners';
import { formOptions } from '../types/formOptions';
import { PartnersProps } from '../types/interfaces/Partners';

const Snackbar = dynamic(() => import('@material-ui/core/Snackbar'));

interface PartnersServer {
  partnersList: PartnersProps[];
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Partners({ partnersList }: PartnersServer) {
  const { token } = useAuth();

  const [currentPartners, setCurrentPartners] = useState<PartnersProps[]>(partnersList);

  const [showAlert, setShowAlert] = useState(false);

  function handleFailedPartnersActionAlert() {
    setShowAlert(false);
  }

  async function disablePartner(id: string): Promise<boolean> {
    try {
      await api.patch(
        `/partners/${id}`,
        {
          active: false,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setShowAlert(false);

      return true;
    } catch (err) {
      setShowAlert(true);
      return false;
    }
  }

  async function activatePartner(id: string): Promise<boolean> {
    try {
      await api.patch(
        `/partners/${id}`,
        {
          active: true,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setShowAlert(false);
      return true;
    } catch (err) {
      setShowAlert(true);
      return false;
    }
  }

  function mutatePartner(index: number, active: boolean) {
    const updatedPartners = [...currentPartners];
    updatedPartners[index]['active'] = active;
    setCurrentPartners(updatedPartners);
  }

  async function handlePartnerAction(index: number, isActive: boolean) {
    const id = currentPartners[index]['_id'];

    isActive && (await disablePartner(id)) && mutatePartner(index, !isActive);
    !isActive && (await activatePartner(id)) && mutatePartner(index, !isActive);
  }

  return (
    <Container>
      <Head>
        <title>Gerenciamento dos Parceiros | JJM</title>
      </Head>
      <h3>Parceiros Cadastrados</h3>
      <ul>
        {currentPartners &&
          currentPartners.map((partner, index) => {
            return (
              <ListItem key={partner._id} active={partner.active}>
                <strong>{partner.name}</strong>
                <hr />
                <span>
                  Vencimento dia
                  <strong>{partner.paymentDay}</strong>
                </span>
                <ListItemButtonContainer>
                  <button
                    type="button"
                    className={partner.active ? 'disable' : 'active'}
                    onClick={() => handlePartnerAction(index, partner.active)}
                  >
                    {partner.active ? 'Desativar' : 'Ativar'}
                  </button>
                  <Link
                    href={{
                      // pathname: `/writer-area?update=${formOptions.partners}&id=${partner._id}`,
                      pathname: `/writer-area`,
                      query: { update: formOptions.partners, id: partner._id },
                    }}
                    as={'writer-area'}
                  >
                    <button type="button">Editar</button>
                  </Link>
                </ListItemButtonContainer>
              </ListItem>
            );
          })}
      </ul>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleFailedPartnersActionAlert}
      >
        <Alert severity="warning">
          Houve algum problema ao processar! Tente mais tarde!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const { data } = await api.get('/fullpartners', {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    const partnersList = data.sort((item) => item.active);

    return {
      props: {
        partnersList,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
