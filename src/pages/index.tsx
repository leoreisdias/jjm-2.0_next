import React, { useState, useEffect } from 'react';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Pagination from '@material-ui/lab/Pagination';
import { format, parseISO } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FaSearch } from 'react-icons/fa';
import PuffLoader from 'react-spinners/PuffLoader';

import Advertisement from '../components/Advertisement';
import CardNews from '../components/CardNews';
import DeathReportCard from '../components/DeathReport';
import LastPosts from '../components/LastPosts';
import { useTheme } from '../hooks/useTheme';
import { api } from '../services/api';
import { getCoffeePrice, ICoffeePrice } from '../services/coffeeWebScrapping';
import {
  Wrapper,
  Container,
  Main,
  Aside,
  PaginationContainer,
  CoffeePriceContainer,
} from '../styles/pages/Home';
import { formatNews } from '../utils/formatNews';

interface IServerNewsProps {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  image: string[];
  imageURL: string;
  author: string;
  source: string;
  summary: string;
}

interface News {
  id: string;
  title: string;
  description: string;
  date: string;
  imageURL: string;
  author: string;
  source: string;
  summary: string;
}

interface newsProps {
  coffeePriceData: ICoffeePrice;
  newsList: News[];
  topFourRecentNews: News[];
  totalPages: number;
}

export default function Home({
  newsList,
  topFourRecentNews,
  totalPages,
  coffeePriceData,
}: newsProps) {
  const { colors } = useTheme();

  const [currentNewsList, setCurrentNewsList] = useState(newsList);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchText, setSearchText] = useState('');

  const [isSearching, setIsSearching] = useState(false);

  const matches = useMediaQuery('(max-width:720px)');

  async function handleChangePage(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentPage(value);
    window.scrollTo({
      top: 850,
      left: 0,
      behavior: 'smooth',
    });
    const loadedNews = await loadDataFromNewPage(value);
    setCurrentNewsList(loadedNews);
  }

  async function loadDataFromNewPage(nextPage: number) {
    const {
      data: { docs },
    } = await api.get(`/news?page=${nextPage}`);

    const loadedNews = formatNews(docs);
    setCurrentPage(nextPage);
    return loadedNews;
  }

  async function handleSlideDown() {
    if (matches && window.scrollY >= document.body.scrollHeight * 0.85) {
      const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : totalPages;
      const loadedNews = await loadDataFromNewPage(nextPage);
      setCurrentNewsList([...currentNewsList, ...loadedNews]);
    }
  }

  async function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    const key = event.key;

    if (key == 'Enter') {
      if (searchText !== '') {
        setIsSearching(true);
        const response = await api.get('/search', {
          params: {
            subjects: searchText,
            title: searchText,
          },
        });

        if (response?.data?.news.length) {
          const formatedNews = formatNews(response.data.news);
          setCurrentNewsList(formatedNews.reverse());
        }
        setIsSearching(false);
      } else {
        setCurrentNewsList(newsList);
      }
    }
  }

  useEffect(() => {
    searchText == '' && setCurrentNewsList(newsList);
  }, [newsList, searchText]);

  return (
    <Wrapper>
      <Head>
        <title>Jornal JM</title>
        <meta name="description" content="JJM - Fique informado!" />
        <meta property="og:url" content="www.jornaljotamaria.com.br" />
        <meta property="og:title" content="JJM" />
        <meta property="og:description" content="O seu lugar para ficar informado" />
        <meta property="og:image" content="https://i.imgur.com/Me9liRf.png" />
        <meta property="og:image:alt" content="JJM" />
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="800" />
        <meta property="og:site_name" content="Jornal JM" />
      </Head>
      {currentNewsList ? (
        <Container>
          <Main onTouchMove={handleSlideDown}>
            {currentNewsList.map((newsItem) => {
              return <CardNews key={newsItem.id} news={newsItem} />;
            })}
          </Main>
          <Aside>
            <label htmlFor="search">
              <FaSearch color={colors.jjmPallete_1} />
              <input
                type="text"
                placeholder="Pesquise algo específico"
                value={isSearching ? 'Pesquisando...' : searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleEnter}
              />
            </label>
            {coffeePriceData?.hasData && (
              <CoffeePriceContainer>
                <h3>Cotação do Café</h3>
                <h4>{coffeePriceData.closingDate}</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Local</th>
                      <th>Valor</th>
                      <th>Variação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{coffeePriceData.city}</td>
                      <td>{coffeePriceData.value}</td>
                      <td>{coffeePriceData.variation}</td>
                    </tr>
                  </tbody>
                </table>
              </CoffeePriceContainer>
            )}

            <LastPosts lastestNews={topFourRecentNews} />
            <DeathReportCard />
            <Advertisement showSmallPartners={!matches} />
          </Aside>
        </Container>
      ) : (
        <PuffLoader size={100} color={colors.jjmPallete_1} />
      )}

      {!matches && currentNewsList && (
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
    </Wrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await api.get('/news?page=1');

    const totalPages = data.pages;

    const newsList = data.docs.map((newsItem: IServerNewsProps) => {
      return {
        id: newsItem._id,
        title: newsItem.title,
        description: newsItem.description,
        date: format(parseISO(newsItem.createdAt), 'd MMM yy', {
          locale: ptBr,
        }),
        imageURL: !!newsItem.imageURL ? newsItem.imageURL : newsItem.image[0],
        author: newsItem.author,
        source: newsItem.source ?? '',
        summary: newsItem.summary,
      };
    });

    const topFourRecentNews = newsList.slice(0, 4);

    const coffeePriceData = await getCoffeePrice();

    return {
      props: {
        coffeePriceData,
        newsList,
        topFourRecentNews,
        totalPages,
      },
      revalidate: 60 * 5, // 5 Minutes
    };
  } catch (err) {
    return {
      props: {
        newsList: [],
        topFourRecentNews: [],
        totalPages: 1,
      },
      revalidate: 60 * 2, // 2 minutes
    };
  }
};
