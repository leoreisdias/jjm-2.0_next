import { memo } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { MdShare } from 'react-icons/md';

import { Card } from './CardNewsStyle';

const IconButton = dynamic(() => import('@material-ui/core/IconButton'));
const CardActions = dynamic(() => import('@material-ui/core/CardActions'));
const CardActionArea = dynamic(() => import('@material-ui/core/CardActionArea'));

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
  // const [expanded, setExpanded] = useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  return (
    <Card whileHover={{ scale: 0.99, transition: { duration: 0.1 } }}>
      <Link href={`/complete-news/${news.id}`}>
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
          {/* <IconButtonExpand
            style={expanded ? { transform: 'rotate(180deg)' } : {}}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <MdExpandMore />
          </IconButtonExpand> */}
        </CardActions>
      </span>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {news.}
        </CardContent>
      </Collapse> */}
    </Card>
  );
};

export default memo(CardNews);
