import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FaShareAlt } from 'react-icons/fa';

import { Advertisement } from '../../components/Advertisement';
import { api } from '../../services/api';
import {
  Wrapper,
  Container,
  Main,
  Aside,
  NewsTitle,
  SmallDetails,
  NewsContent,
} from '../../styles/pages/DeathReport';

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

export default function CompleteNews({ report, currentUrl }: CompleteReportProps) {
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
            <Image width={400} height={500} src={report.mainImage} />
          </span>
          <NewsTitle>{report.title}</NewsTitle>
          <SmallDetails>
            <p>
              <span>{report.date}</span>
            </p>
          </SmallDetails>
          <NewsContent>
            <p>{report.description}</p>

            <div>
              <h4>Informativo da Funerária São Dimas</h4>
            </div>
            <div>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <FaShareAlt size={25} color={'gray'} />
                  Compartilhar
                </span>
              </a>
            </div>
          </NewsContent>
        </Main>
        <Aside>
          <Advertisement />
        </Aside>
      </Container>
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
      reports.imageURL ??
      'https://jjm-upload.s3.amazonaws.com/Parceiros/BannerMetaTagsNotasFalecimento.png',
    data: format(parseISO(reports.createdAt), 'dd/MM/yyyy', {
      locale: ptBR,
    }),
  };

  return {
    props: {
      report: formatedReport,
      currentUrl: `www.jornaljotamaria.com.br/report-detail/${id}`,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
