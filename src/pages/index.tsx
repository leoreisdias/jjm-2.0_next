import { format, parseISO } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { Advertisement } from '../components/Advertisement';
import { CardNews } from '../components/CardNews';
import { LastPosts } from '../components/LastPosts';
import { api } from '../services/api';
import { Wrapper, Container, Main, Aside } from '../styles/pages/Home';

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
}

export default function Home({ newsList, topFourRecentNews }: newsProps) {
  return (
    <Wrapper>
      <Head>
        <title>Jornal JM</title>
      </Head>
      <Container>
        <Main>
          {newsList ? (
            newsList.map((newsItem) => {
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
    </Wrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { docs },
  } = await api.get('/news?page=1');
  console.log(docs);

  const newsList = docs.map((newsItem: serverNewsProps) => {
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
    },
    revalidate: 60 * 60, // 1 hour
  };
};
