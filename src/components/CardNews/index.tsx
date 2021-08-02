import { useState, memo } from 'react';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Image from 'next/image';
import Link from 'next/link';
import { MdExpandMore, MdShare } from 'react-icons/md';

import { Card, IconButtonExpand } from './CardNewsStyle';

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
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card whileHover={{ scale: 0.99, transition: { duration: 0.1 } }}>
      <Link href={`/complete-news/${news.id}`}>
        <CardActionArea>
          <Image
            width={720}
            height={600}
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
          <IconButtonExpand
            style={expanded ? { transform: 'rotate(180deg)' } : {}}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <MdExpandMore />
          </IconButtonExpand>
        </CardActions>
      </span>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {news.description.split('##').map((item, index) => {
            return (
              <p
                key={index}
                dangerouslySetInnerHTML={{
                  __html: item,
                }}
              />
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default memo(CardNews);
