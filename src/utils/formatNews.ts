import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import parseISO from 'date-fns/parseISO';

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

export const formatNews = (news: serverNewsProps[]): News[] => {
  const formatedNews = news.map((newsItem) => {
    return {
      id: newsItem._id,
      title: newsItem.title,
      description: newsItem.description,
      date: format(parseISO(newsItem.createdAt), 'd MMM yy', {
        locale: ptBR,
      }),
      imageURL: newsItem.imageURL,
      author: newsItem.author,
      source: newsItem.source,
      summary: newsItem.summary,
    };
  });

  return formatedNews;
};
