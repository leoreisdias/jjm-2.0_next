import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { Advertisement } from '../../components/Advertisement';
import { LastPosts } from '../../components/LastPosts';
import { api } from '../../services/api';
import { Wrapper, Container, Main, Aside } from '../../styles/pages/CompleteNews';

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
  subjects: string;
  id: string;
  title: string;
  description: string;
  date: string;
  mainImage: string;
  author: string;
  source: string;
  summary: string;
}

interface CompleteNewsProps {
  news: NewsPropsFromServer;
}

export default function CompleteNews({ news }: CompleteNewsProps) {
  console.log(news);

  return (
    <Wrapper>
      <Head>
        <title>Jornal JM</title>
      </Head>
      <Container>
        <Main>
          <Image width={900} height={400} src={news.mainImage} />
          <h1>{news.title}</h1>
          <div>
            <p>
              <span>Por {news.author}</span>
              <span>{news.date}</span>
            </p>
            <p>
              <span>{news.source}</span>
            </p>
          </div>
          <main>
            <p>{news.description}</p>

            <div>
              <h4>Assuntos</h4>
              <ul>
                <li>{news.subjects}</li>
              </ul>
            </div>
            <div>SHARE</div>
          </main>
          <section>
            <h4>Notícias Relacionadas</h4>
            <div>
              <ul>
                <li>
                  <img src="" alt="" />
                  <p>
                    <strong>Titulo</strong>
                  </p>
                  <span>Fonte</span>
                </li>
                <li>
                  <img src="" alt="" />
                  <p>
                    <strong>Titulo</strong>
                  </p>
                  <span>Fonte</span>
                </li>
                <li>
                  <img src="" alt="" />
                  <p>
                    <strong>Titulo</strong>
                  </p>
                  <span>Fonte</span>
                </li>
              </ul>
            </div>
          </section>
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

  const formatData = {
    subjects: news.subjects.join(', '),
    id: news._id,
    title: news.title,
    description: news.description,
    date: format(parseISO(news.createdAt), 'dd/MM/yyyy', {
      locale: ptBR,
    }),
    mainImage: news.imageURL,
    author: news.author.toLowerCase(),
    source: news.source,
    summary: news.summary,
  };

  console.log(news);

  return {
    props: {
      news: formatData,
    },
  };
};
