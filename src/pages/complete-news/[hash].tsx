import { useContext, useState, useMemo, useCallback, useEffect } from 'react';

import { Dialog } from '@material-ui/core';
import { motion } from 'framer-motion';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaEdit, FaShareAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import CircleLoader from 'react-spinners/CircleLoader';
import { ThemeContext } from 'styled-components';

import { Advertisement } from '../../components/Advertisement';
import { ModalDialog } from '../../components/ModalDialog';
import { useAuth } from '../../hooks/useAuth';
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
  CustomDialogContent,
  Subjects,
  ShareSocialMedia,
  OfferedBy,
} from '../../styles/pages/CompleteNews';
import { formOptions } from '../../types/formOptions';
import { PartnersProps } from '../../types/interfaces/Partners';

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
  const { colors } = useContext(ThemeContext);
  const { token } = useAuth();

  const [isDeleting, setIsDeleting] = useState(false);

  const { replace } = useRouter();

  const { isAuthenticated } = useAuth();

  const [openDeleteModel, setOpenDeleteModal] = useState(false);

  const [randomPartner, setRandomPartner] = useState<PartnersProps>();

  function handleDeleteModal() {
    setOpenDeleteModal((oldModalOpen) => !oldModalOpen);
  }

  const deleteNewsById = useCallback(async () => {
    try {
      setIsDeleting(true);
      const { data } = await api.delete(`/news/${news.id}`, {
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
  }, [news.id, replace, token]);

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
            <button type="button" onClick={deleteNewsById}>
              Excluir
            </button>
            <button type="button" onClick={handleDeleteModal}>
              Cancelar
            </button>
          </span>
        )}
      </>
    );
  }, [deleteNewsById, isDeleting]);

  const getRandomPartner = useCallback(async () => {
    try {
      const { data } = await api.get('/getrandompartner');
      if (data.partner) {
        setRandomPartner(data.partner[0]);
      }
    } catch (err) {
      setRandomPartner(null);
    }
  }, []);

  useEffect(() => {
    getRandomPartner();
  }, [getRandomPartner]);

  return (
    <Wrapper>
      <Head>
        <title>[JJM] {news.title}</title>
        <meta
          property="og:url"
          content={`www.jornaljotamaria.com.br/complete-news/${news.id}`}
        />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={news.summary} />
        <meta property="og:image" content={`${news.mainImage}?fit=1280%2C720&ssl=1`} />
        <meta property="og:image:alt" content="Matéria JM" />
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="800" />
      </Head>
      <Container>
        <Main>
          <Image
            width={800}
            height={600}
            src={news.mainImage}
            objectFit="contain"
            placeholder="blur"
            blurDataURL={news.mainImage}
          />
          <NewsTitle>{news.title}</NewsTitle>
          <SmallDetails>
            <p>
              <span>Por {news.author}</span>
              <span>{news.date}</span>
            </p>
            <p>
              <span>{news.source}</span>
              <span>
                {isAuthenticated && (
                  <>
                    <Link
                      href={{
                        pathname: `/writer-area`,
                        query: { update: formOptions.news, id: news.id },
                      }}
                      as={'writer-area'}
                    >
                      <span>
                        <FaEdit size={17} color={colors.jjmBlue} className="icon" />
                      </span>
                    </Link>
                    <MdDelete
                      size={17}
                      color={'red'}
                      className="icon"
                      onClick={handleDeleteModal}
                    />
                  </>
                )}
              </span>
            </p>
          </SmallDetails>
          <NewsContent>
            <p dangerouslySetInnerHTML={{ __html: news.description }} />

            {randomPartner && (
              <OfferedBy>
                <h5>Oferecido por:</h5>
                <span>
                  <Image
                    src={randomPartner.imageURL}
                    blurDataURL={randomPartner.imageURL}
                    placeholder="blur"
                    height={100}
                    width={100}
                    objectFit="contain"
                  />
                  <p>{randomPartner.name}</p>
                </span>
              </OfferedBy>
            )}

            <Subjects>
              <h4>Assuntos</h4>
              <ul>
                {news.subjects &&
                  news.subjects.map((subject) => {
                    return <li key={subject}>{subject}</li>;
                  })}
              </ul>
            </Subjects>
            <ShareSocialMedia>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <FaShareAlt size={25} color={colors.jjmBlue} />
                  Compartilhar
                </span>
              </a>
            </ShareSocialMedia>
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
                          <Image
                            width={250}
                            height={150}
                            src={news.mainImage}
                            placeholder="blur"
                            blurDataURL={news.mainImage}
                          />

                          <strong>{news.title.toLowerCase()}</strong>
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
          <Advertisement reverse={true} />
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

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const format = (await import('date-fns/format')).default;
  const parseISO = (await import('date-fns/parseISO')).default;
  const ptBR = (await import('date-fns/locale/pt-BR')).default;
  try {
    const { hash } = params;

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
      source: news.source ? news.source.toUpperCase() : '',
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
        source: news.source ? news.source.toLowerCase() : '',
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
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
