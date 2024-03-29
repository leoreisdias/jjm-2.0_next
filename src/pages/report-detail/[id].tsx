import { useCallback, useMemo, useState } from 'react';

import { Dialog } from '@material-ui/core';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaEdit, FaShareAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import CircleLoader from 'react-spinners/CircleLoader';

import Advertisement from '../../components/Advertisement';
import ModalDialog from '../../components/ModalDialog';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { api } from '../../services/api';
import {
  Wrapper,
  Container,
  Main,
  Aside,
  ReportTitle,
  SmallDetails,
  ReportContent,
  CustomDialogContent,
  ShareSocialMedia,
} from '../../styles/pages/DeathReport';
import { formOptions } from '../../types/formOptions';

interface ReportProps {
  _id: string;
  title: string;
  name: string;
  description: string;
  date: string;
  createdAt: string;
  reportImage: string;
  imageURL: string;
}

interface ReportPropsFromServer {
  id: string;
  title: string;
  name: string;
  description: string;
  date: string;
  mainImage: string;
}

interface CompleteReportProps {
  report: ReportPropsFromServer;
  currentUrl: string;
}

export default function ReportDetail({ report, currentUrl }: CompleteReportProps) {
  const { replace } = useRouter();
  const { colors } = useTheme();
  const { isAuthenticated, token } = useAuth();

  const [isDeleting, setIsDeleting] = useState(false);
  const [openDeleteModel, setOpenDeleteModal] = useState(false);

  function handleDeleteModal() {
    setOpenDeleteModal((oldModalOpen) => !oldModalOpen);
  }

  const deleteReportById = useCallback(async () => {
    try {
      setIsDeleting(true);
      const { data } = await api.delete(`/reports/${report.id}`, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });

      if (data.message) {
        replace('/');
      } else {
        setIsDeleting(false);
      }
    } catch (err) {
      setIsDeleting(false);
    }
  }, [report.id, replace, token]);

  const ExcludeNewsModalContent = useMemo(() => {
    return (
      <>
        <strong>
          {isDeleting
            ? 'Deletando... Aguarde'
            : 'Tem certeza que deseja excluir essa notícia?'}
        </strong>
        {isDeleting ? (
          <CircleLoader size={40} />
        ) : (
          <span>
            <button type="button" onClick={deleteReportById}>
              Excluir
            </button>
            <button type="button" onClick={handleDeleteModal}>
              Cancelar
            </button>
          </span>
        )}
      </>
    );
  }, [deleteReportById, isDeleting]);

  return (
    <Wrapper>
      <Head>
        <title>Jornal JM - {report.title}</title>
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={report.title} />
        <meta property="og:description" content={report.description} />
        <meta property="og:image" content={`${report.mainImage}?fit=1280%2C720&ssl=1`} />
        <meta property="og:image:alt" content="Matéria JM" />
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="800" />
      </Head>
      <Container>
        <Main>
          <span>
            <Image
              width={400}
              height={500}
              src={report.mainImage}
              placeholder="blur"
              blurDataURL={report.mainImage}
              objectFit="contain"
              alt="Foto da Nota"
            />
          </span>
          <ReportTitle>{report.title}</ReportTitle>
          <SmallDetails>
            <p>
              <span>{report.date}</span>
              <span>
                {isAuthenticated && (
                  <>
                    <Link
                      href={{
                        pathname: `/writer-area`,
                        query: { update: formOptions.deathReport, id: report.id },
                      }}
                      as={'/writer-area'}
                    >
                      <span>
                        <FaEdit size={17} color={colors.jjmPallete_1} className="icon" />
                      </span>
                    </Link>
                    <MdDelete
                      size={25}
                      color={'red'}
                      className="icon"
                      onClick={handleDeleteModal}
                    />
                  </>
                )}
              </span>
            </p>
          </SmallDetails>
          <ReportContent>
            <p>{report.description}</p>

            {/* <div>
              <h4>Informativo da Funerária São Dimas</h4>
            </div> */}
            <ShareSocialMedia>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <FaShareAlt size={25} color={colors.jjmPallete_1} />
                  Compartilhar
                </span>
              </a>
            </ShareSocialMedia>
          </ReportContent>
        </Main>
        <Aside>
          <Advertisement showSmallPartners={false} />
        </Aside>
      </Container>
      <Dialog
        open={openDeleteModel}
        onClose={handleDeleteModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CustomDialogContent></CustomDialogContent>
      </Dialog>
      <ModalDialog
        isOpen={openDeleteModel}
        close={handleDeleteModal}
        modalContent={ExcludeNewsModalContent}
      />
    </Wrapper>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const format = (await import('date-fns/format')).default;
  const parseISO = (await import('date-fns/parseISO')).default;
  const ptBR = (await import('date-fns/locale/pt-BR')).default;
  try {
    const { id } = params;

    const {
      data: { reports },
    } = await api.get<{ reports: ReportProps }>('/reportDetail', {
      params: {
        id,
      },
    });

    const formatedReport = {
      id: reports._id,
      title: reports.title,
      description: reports.description ?? '',
      name: reports.name,
      mainImage:
        reports.imageURL !== ''
          ? reports.imageURL
          : 'https://jornaljm.s3.sa-east-1.amazonaws.com/BannerMetaTagsNotasFalecimento.webp',
      date: format(parseISO(reports.createdAt), 'dd/MM/yyyy', {
        locale: ptBR,
      }),
    };

    return {
      props: {
        report: formatedReport,
        currentUrl: `https://www.jornaljm.com.br/report-detail/${id}`,
      },
      revalidate: 60 * 30, // 30 minutes
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
