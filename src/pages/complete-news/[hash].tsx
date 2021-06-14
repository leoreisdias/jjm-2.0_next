import { motion } from 'framer-motion';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaShareAlt } from 'react-icons/fa';

import { Advertisement } from '../../components/Advertisement';
import { LastPosts } from '../../components/LastPosts';
import { api } from '../../services/api';
import {
  Wrapper,
  Container,
  Main,
  Aside,
  NewsTitle,
  SmallDetails,
  NewsContent,
  RelatedNewsSection,
} from '../../styles/pages/CompleteNews';

interface NewsProps {
  subjects: string[];
  _id: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
  image: string;
  imageURL: string;
  author: string;
  source: string;
  summary: string;
}

interface NewsPropsFromServer {
  subjects: string[];
  id: string;
  title: string;
  description: string;
  date: string;
  mainImage: string;
  author: string;
  source: string;
  summary: string;
}

interface RelatedNewsProps {
  id: string;
  title: string;
  mainImage: string;
  source: string;
  url: string;
}

interface CompleteNewsProps {
  news: NewsPropsFromServer;
  formatedRelatedNews: RelatedNewsProps[];
  currentUrl: string;
}

export default function CompleteNews({
  news,
  currentUrl,
  formatedRelatedNews,
}: CompleteNewsProps) {
  return (
    <Wrapper>
      <Head>
        <title>Jornal JM</title>
      </Head>
      <Container>
        <Main>
          <Image width={900} height={500} src={news.mainImage} />
          <NewsTitle>{news.title}</NewsTitle>
          <SmallDetails>
            <p>
              <span>Por {news.author}</span>
              <span>{news.date}</span>
            </p>
            <p>
              <span>{news.source}</span>
            </p>
          </SmallDetails>
          <NewsContent>
            <p>{news.description}</p>

            <div>
              <h4>Assuntos</h4>
              <ul>
                {news.subjects &&
                  news.subjects.map((subject) => {
                    return <li key={subject}>{subject}</li>;
                  })}
              </ul>
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
          <RelatedNewsSection>
            <h4>Notícias Relacionadas</h4>
            <div>
              <ul>
                {formatedRelatedNews &&
                  formatedRelatedNews.map((news) => {
                    return (
                      <Link href={`/complete-news/${news.id}`} key={news.id}>
                        <motion.li
                          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                        >
                          <Image width={250} height={150} src={news.mainImage} />

                          <strong>{news.title}</strong>
                          <span>{news.source}</span>
                        </motion.li>
                      </Link>
                    );
                  })}
              </ul>
            </div>
          </RelatedNewsSection>
        </Main>
        <Aside>
          <Advertisement />
        </Aside>
      </Container>
    </Wrapper>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { docs },
  } = await api.get('/news?page=1');

  const paths = docs.map((news: NewsProps) => {
    return {
      params: {
        hash: news._id,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const format = (await import('date-fns/format')).default;
  const parseISO = (await import('date-fns/parseISO')).default;
  const ptBR = (await import('date-fns/locale/pt-BR')).default;

  const { hash } = ctx.params;

  const {
    data: { news },
  } = await api.get<{ news: NewsProps }>('/detail', {
    params: {
      id: hash,
    },
  });

  const formatNews = {
    subjects: news.subjects,
    id: news._id,
    title: news.title,
    description: news.description.split('##').join('\n'),
    date: format(parseISO(news.createdAt), 'dd/MM/yyyy', {
      locale: ptBR,
    }),
    mainImage: news.imageURL,
    author: news.author.toLowerCase(),
    source: news.source.toLowerCase(),
    summary: news.summary,
  };

  const relatedNews = await api.get('/search', {
    params: {
      subjects: formatNews.subjects.join(', '),
    },
  });
  const lastRelatedNews = relatedNews.data.news.reverse().slice(1, 4);

  const formatedRelatedNews = lastRelatedNews.map((news: NewsProps) => {
    return {
      id: news._id,
      title: news.title,
      mainImage: news.imageURL,
      source: news.source.toLowerCase(),
      url: `www.jornaljotamaria.com.br/complete-news/${news._id}`,
    };
  });

  return {
    props: {
      news: formatNews,
      formatedRelatedNews,
      currentUrl: `www.jornaljotamaria.com.br/complete-news/${hash}`,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
