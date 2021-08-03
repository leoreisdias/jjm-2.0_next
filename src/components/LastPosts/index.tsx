import { memo } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { LastPostsWrapper, LastPostsContainer } from './LastPosts';

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

interface LastPostsProps {
  lastestNews: NewsProps[];
}

const LastPosts = ({ lastestNews }: LastPostsProps) => {
  return (
    <LastPostsWrapper>
      <legend>Últimas postagens</legend>
      <ul>
        {lastestNews ? (
          lastestNews.map((newsItem) => {
            return (
              <Link href={`/complete-news/${newsItem.id}`} key={newsItem.id}>
                <LastPostsContainer
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Image
                    width={100}
                    height={100}
                    objectFit="cover"
                    src={newsItem.imageURL}
                    alt="Noticia"
                  />
                  <p>
                    <strong>{newsItem.title}</strong>
                    <span>{newsItem.source}</span>
                  </p>
                </LastPostsContainer>
              </Link>
            );
          })
        ) : (
          <li>...</li>
        )}
      </ul>
    </LastPostsWrapper>
  );
};

export default memo(LastPosts);
