import React, { useEffect, useState } from 'react';

import Pagination from '@material-ui/lab/Pagination';
import { format, parseISO } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { Advertisement } from '../components/Advertisement';
import { CardNews } from '../components/CardNews';
import { LastPosts } from '../components/LastPosts';
import { api } from '../services/api';
import {
  Wrapper,
  Container,
  Main,
  Aside,
  PaginationContainer,
} from '../styles/pages/Home';

interface serverNewsProps {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
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
  newsList: News[];
  topFourRecentNews: News[];
  totalPages: number;
}

export default function Home({ newsList, topFourRecentNews, totalPages }: newsProps) {
  const [currentNewsList, setCurrentNewsList] = useState(newsList);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  async function handleChangePage(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentPage(value);
    const loadedNews = await loadDataFromNewPage(value);
    setCurrentNewsList(loadedNews);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  async function loadDataFromNewPage(nextPage: number) {
    const {
      data: { docs },
    } = await api.get(`/news?page=${nextPage}`);

    const loadedNews = docs.map((newsItem: serverNewsProps) => {
      return {
        id: newsItem._id,
        title: newsItem.title,
        description: newsItem.description,
        date: format(parseISO(newsItem.createdAt), 'd MMM yy', {
          locale: ptBr,
        }),
        imageURL: newsItem.imageURL,
        author: newsItem.author,
        source: newsItem.source,
        summary: newsItem.summary,
      };
    });
    setCurrentPage(nextPage);

    return loadedNews;
  }

  async function handleSlideDown() {
    if (isMobile && window.scrollY >= document.body.scrollHeight * 0.85) {
      const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : totalPages;
      const loadedNews = await loadDataFromNewPage(nextPage);
      setCurrentNewsList([...currentNewsList, ...loadedNews]);
    }
  }

  useEffect(() => {
    const { matches } = window.matchMedia('(max-width: 720px)');

    setIsMobile(matches);
  }, []);

  return (
    <Wrapper>
      <Head>
        <title>Jornal JM</title>
      </Head>
      <Container>
        <Main onTouchMove={handleSlideDown}>
          {currentNewsList ? (
            currentNewsList.map((newsItem) => {
              return <CardNews key={newsItem.id} news={newsItem} />;
            })
          ) : (
            <h1>Carregando</h1>
          )}
        </Main>
        <Aside>
          <LastPosts lastestNews={topFourRecentNews} />
          <Advertisement />
        </Aside>
      </Container>
      {!isMobile && (
        <PaginationContainer>
          <Pagination
            count={totalPages}
            variant="outlined"
            color="primary"
            size="large"
            onChange={handleChangePage}
          />
        </PaginationContainer>
      )}
    </Wrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/news?page=1');

  const totalPages = data.pages;

  const newsList = data.docs.map((newsItem: serverNewsProps) => {
    return {
      id: newsItem._id,
      title: newsItem.title,
      description: newsItem.description,
      date: format(parseISO(newsItem.createdAt), 'd MMM yy', {
        locale: ptBr,
      }),
      imageURL: newsItem.imageURL,
      author: newsItem.author,
      source: newsItem.source,
      summary: newsItem.summary,
    };
  });

  const topFourRecentNews = newsList.slice(0, 4);

  return {
    props: {
      newsList,
      topFourRecentNews,
      totalPages,
    },
    revalidate: 60 * 60, // 1 hour
  };
};
