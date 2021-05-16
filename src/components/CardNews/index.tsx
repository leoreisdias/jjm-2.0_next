import Image from 'next/image';

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

export function CardNews({ news }: CardNewsProps) {
  return (
    <Card>
      <Image width={720} height={600} objectFit="cover" src={news.imageURL} alt="" />
      <small>
        Por: {news.author} - {news.date}
      </small>
      <h3>{news.title}</h3>
      <p>{news.summary}</p>
      <hr />
      <span>{news.source}</span>
    </Card>
  );
}
