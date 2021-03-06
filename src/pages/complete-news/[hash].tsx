import { useState, useMemo, useCallback } from 'react';

import { Dialog } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { motion } from 'framer-motion';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaEdit, FaShareAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import CircleLoader from 'react-spinners/CircleLoader';
import ScaleLoader from 'react-spinners/ScaleLoader';

import Advertisement from '../../components/Advertisement';
import ModalDialog from '../../components/ModalDialog';
import { useAuth } from '../../hooks/useAuth';
import { useJJM } from '../../hooks/useJJM';
import { useTheme } from '../../hooks/useTheme';
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
  LoadingRelatedNews,
  Video,
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
  video_url?: string;
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
  video_url?: string;
}

interface CompleteNewsProps {
  news: NewsPropsFromServer;
  formatedRelatedNews: RelatedNewsProps[];
  currentUrl: string;
}

interface RelatedNewsProps {
  id: string;
  title: string;
  mainImage: string;
  source: string;
  url: string;
}

interface RandomPartners {
  partner: PartnersProps[];
}
export default function CompleteNews({
  news,
  currentUrl,
  formatedRelatedNews,
}: CompleteNewsProps) {
  const { replace } = useRouter();

  const { data: randomPartner } = useJJM<RandomPartners>('/getrandompartner');
  // const { data: newsFromServer } = useJJM<NewsPropsFromServer>(
  //   query.hash ? `/detail?id=${query.hash}` : null
  // );

  const matches = useMediaQuery('(max-width:720px)');

  const { colors } = useTheme();
  const { token } = useAuth();

  const [isDeleting, setIsDeleting] = useState(false);

  const { isAuthenticated } = useAuth();

  const [openDeleteModel, setOpenDeleteModal] = useState(false);
  // const [currentUrl, setCurrentUrl] = useState('');

  // const [news, setNews] = useState<NewsPropsFormatted>();
  // const [formatedRelatedNews, setFormatedRelatedNews] = useState<RelatedNewsProps[]>();

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
  }, [news?.id, replace, token]);

  const ExcludeNewsModalContent = useMemo(() => {
    return (
      <>
        <strong>
          {isDeleting
            ? 'Deletando... Aguarde'
            : 'Tem certeza que deseja excluir essa not??cia?'}
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

  // const searchRelatedNews = useCallback(async (subjects: string[]) => {
  //   const relatedNews = await api.get('/searchrelated', {
  //     params: {
  //       subjects: subjects.join(', '),
  //     },
  //   });
  //   const lastRelatedNews = relatedNews.data.news.reverse().slice(1, 4);
  //   const formatedRelatedNews = lastRelatedNews.map((news: NewsProps) => {
  //     return {
  //       id: news._id,
  //       title: news.title,
  //       mainImage: news.imageURL,
  //       source: news.source ? news.source.toLowerCase() : '',
  //       url: `https://www.jornaljm.com.br/complete-news/${news._id}`,
  //     };
  //   });
  //   setFormatedRelatedNews(formatedRelatedNews);
  // }, []);

  // const formatNews = useCallback(() => {
  //   if (newsFromServer?.news) {
  //     const formattedNews = {
  //       subjects: newsFromServer.news.subjects,
  //       id: newsFromServer.news._id,
  //       title: newsFromServer.news.title,
  //       description: newsFromServer.news.description.split('##').join('\n'),
  //       date: format(parseISO(newsFromServer.news.createdAt), 'dd/MM/yyyy', {
  //         locale: ptBR,
  //       }),
  //       mainImage: newsFromServer.news.imageURL,
  //       author: newsFromServer.news.author
  //         ? newsFromServer.news.author.toLowerCase()
  //         : 'JJM',
  //       source: newsFromServer.news.source
  //         ? newsFromServer.news.source.toUpperCase()
  //         : '',
  //       summary: newsFromServer.news.summary,
  //       video_url: newsFromServer.news.video_url ?? '',
  //     };

  //     setNews(formattedNews);
  //     setCurrentUrl(`https://www.jornaljm.com.br/complete-news/${formattedNews.id}`);
  //   }
  // }, [newsFromServer]);

  // useEffect(() => {
  //   newsFromServer?.news && formatNews();
  //   newsFromServer?.news && searchRelatedNews(newsFromServer?.news.subjects);
  // }, [formatNews, newsFromServer, searchRelatedNews]);

  // if (!news) {
  //   return <WhiteBackdrop />;
  // }

  return (
    <Wrapper>
      <Head>
        <title>[JJM] {news.title}</title>
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={news.summary} />
        <meta property="og:image" content={`${news.mainImage}?fit=1280%2C720&ssl=1`} />
        <meta property="og:image:alt" content="Mat??ria JM" />
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
            alt="Foto da Not??cia"
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
                        <FaEdit size={17} color={colors.jjmPallete_1} className="icon" />
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
            <div
              dangerouslySetInnerHTML={{ __html: '<p>' + news.description + '</p>' }}
            ></div>

            {news.video_url && (
              <Video>
                <h5>V??deo Reportagem</h5>
                <hr />
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: news.video_url,
                    }}
                  />
                </div>
              </Video>
            )}
            <OfferedBy>
              <h5>Oferecido por:</h5>
              {randomPartner && randomPartner?.partner.length ? (
                <span>
                  <Image
                    src={randomPartner.partner[0].imageURL}
                    blurDataURL={randomPartner.partner[0].imageURL}
                    placeholder="blur"
                    height={100}
                    width={100}
                    objectFit="contain"
                    alt="Parceiro de destaque"
                  />
                  <p>{randomPartner.partner[0].name}</p>
                </span>
              ) : (
                <p>Seu neg??cio pode estar aqui!</p>
              )}
            </OfferedBy>
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
                  <FaShareAlt size={25} color={colors.jjmPallete_1} />
                  Compartilhar
                </span>
              </a>
            </ShareSocialMedia>
          </NewsContent>
          <RelatedNewsSection>
            <h4>Not??cias Relacionadas</h4>
            <div>
              <ul>
                {formatedRelatedNews ? (
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
                            alt="Noticias Relacionadas"
                          />

                          <strong>{news.title.toLowerCase()}</strong>
                          <span>{news.source}</span>
                        </motion.li>
                      </Link>
                    );
                  })
                ) : (
                  <LoadingRelatedNews>
                    <strong>Carregando... Por favor, aguarde</strong>
                    <ScaleLoader color={colors.jjmPallete_1} />
                  </LoadingRelatedNews>
                )}
              </ul>
            </div>
          </RelatedNewsSection>
        </Main>
        <Aside>
          <Advertisement reverse={!matches} showSmallPartners={true} />
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
      author: news.author ? news.author.toLowerCase() : 'JJM',
      source: news.source ? news.source.toUpperCase() : '',
      summary: news.summary,
      video_url: news.video_url ?? '',
    };

    const relatedNews = await api.get('/searchrelated', {
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
        url: `https://www.jornaljm.com.br/complete-news/${news._id}`,
      };
    });

    return {
      props: {
        news: formatNews,
        formatedRelatedNews,
        currentUrl: `https://www.jornaljm.com.br/complete-news/${hash}`,
      },
      revalidate: 60 * 5, // 5 minutes
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
