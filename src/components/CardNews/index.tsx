import { memo } from 'react';

import { CardActionArea, IconButton, CardActions } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import { MdShare } from 'react-icons/md';

import { Card } from './CardNewsStyle';

interface NewsProps {
  id: string;
  title: string;
  description: string;
  date: string;
  imageURL: string;
  author: string;
  source: string;
  summary: string;
}

interface CardNewsProps {
  news: NewsProps;
}

const CardNews = ({ news }: CardNewsProps) => {
  return (
    <Card>
      <Link href={`/complete-news/${news.id}`}>
        <span>
          <CardActionArea>
            <Image
              width={400}
              height={340}
              placeholder="blur"
              blurDataURL={news.imageURL}
              objectFit="cover"
              src={news.imageURL}
              alt="Imagem da Noticia"
            />
            <small>
              Por: {news.author.toLowerCase()} - {news.date}
            </small>
          </CardActionArea>
        </span>
      </Link>
      <Link href={`/complete-news/${news.id}`}>
        <h3>{news.title}</h3>
      </Link>
      <p>{news.summary}</p>
      <hr />
      <span>
        {news.source}
        <CardActions disableSpacing>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=https://www.jornaljm.com.br/complete-news/${news.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <IconButton aria-label="share">
              <MdShare color={'#3291a7'} />
            </IconButton>
          </a>
        </CardActions>
      </span>
    </Card>
  );
};

export default memo(CardNews);
