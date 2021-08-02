import { useState } from 'react';

import { useMediaQuery } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import { AnimatePresence } from 'framer-motion';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { lighten } from 'polished';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { GiPeaceDove } from 'react-icons/gi';

import { SlowFadeInOut } from '../assets/motion/Variants';
import { useTheme } from '../hooks/useTheme';
import { api } from '../services/api';
import {
  Container,
  List,
  ListItem,
  Person,
  NoteInfo,
  PaginationContainer,
} from '../styles/pages/ReportsList';
import { formatReport } from '../utils/formatReport';

interface Report {
  id: string;
  title: string;
  name: string;
  description: string;
  date: string;
  imageURL: string;
}

interface ReportsProps {
  reports: Report[];
  totalPages: number;
}

export default function Reports({ reports, totalPages }: ReportsProps) {
  const { colors } = useTheme();
  const { push } = useRouter();

  const [currentReportList, setCurrentReportList] = useState(reports);

  const [currentPage, setCurrentPage] = useState(1);

  const matches = useMediaQuery('(max-width:720px)');

  const [isLoading, setIsLoading] = useState(false);

  async function handleChangePage(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    const loadedReports = await loadDataFromNewPage(value);
    setCurrentReportList(loadedReports);
  }

  async function loadDataFromNewPage(nextPage: number) {
    matches && setIsLoading(true);
    try {
      const {
        data: { docs },
      } = await api.get(`/deathreports?page=${nextPage}`);

      const loadedReports = formatReport(docs);
      setCurrentPage(nextPage);
      setIsLoading(false);
      return loadedReports;
    } catch (err) {
      setIsLoading(false);
      push('/');
    }
  }

  async function handleSlideDown() {
    if (matches && window.scrollY >= document.body.scrollHeight * 0.55) {
      const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : totalPages;
      const loadedReports = await loadDataFromNewPage(nextPage);
      setCurrentReportList([...currentReportList, ...loadedReports]);
    }
  }

  function goToReportDetail(id: string) {
    push(`/report-detail/${id}`);
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <Head>
        <title>Jornal JM</title>
        <meta name="description" content="Jornal JM - Fique informado!" />
        <meta property="og:url" content="www.jornaljotamaria.com.br" />
        <meta property="og:title" content="JJM - Notas de Falecimento" />
        <meta property="og:description" content="Notas de Falecimento" />
        <meta property="og:image" content="https://i.imgur.com/Me9liRf.png" />
        <meta property="og:image:alt" content="JJM" />
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="800" />
        <meta property="og:site_name" content="Jornal JM" />
      </Head>
      <Container
        onTouchMove={handleSlideDown}
        initial="begin"
        animate="animate"
        exit="exit"
        variants={SlowFadeInOut}
      >
        <Head>
          <title>Notas de Falecimento | JJM</title>
        </Head>
        <h1>Notas de Falecimento</h1>
        <h3>Funerária São Dimas</h3>
        <List>
          {currentReportList &&
            currentReportList.map((item) => {
              return (
                <ListItem key={item.id}>
                  <GiPeaceDove
                    color={lighten(0.1, colors.jjmPallete_1)}
                    size={60}
                    className="davePeace"
                  />
                  <Person>
                    <Image
                      src={item.imageURL}
                      placeholder="blur"
                      blurDataURL={item.imageURL}
                      width={110}
                      height={120}
                      objectFit="contain"
                    />
                    <strong>{item.name}</strong>
                  </Person>
                  <NoteInfo>
                    <strong>{item.date}</strong>
                    <BiMessageSquareDetail
                      size={25}
                      color={'black'}
                      className="icon"
                      onClick={() => goToReportDetail(item.id)}
                    />
                  </NoteInfo>
                </ListItem>
              );
            })}
          {isLoading && <Skeleton animation="wave" height="100%" width="280px" />}
        </List>
        {!matches && currentReportList && (
          <PaginationContainer>
            <Pagination
              count={totalPages}
              variant="outlined"
              color="primary"
              size="large"
              onChange={handleChangePage}
              style={{ color: 'white' }}
            />
          </PaginationContainer>
        )}
      </Container>
    </AnimatePresence>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await api.get('/deathreports?page=1');
    const totalPages = data.pages;

    const formattedReports = formatReport(data.docs);

    return {
      props: {
        reports: formattedReports,
        totalPages,
      },
      revalidate: 60 * 5, // 5 minutes
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
