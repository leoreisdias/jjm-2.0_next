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

export function LastPosts({ lastestNews }: LastPostsProps) {
  return (
    <LastPostsWrapper>
      <legend>Últimas postagens</legend>
      <ul>
        {lastestNews ? (
          lastestNews.map((newsItem) => {
            return (
              <Link href={`/complete-news/${newsItem.id}`} key={newsItem.id}>
                <LastPostsContainer>
                  <Image
                    width={100}
                    height={100}
                    objectFit="cover"
                    src={newsItem.imageURL}
                    alt=""
                  />
                  <p>
                    <span>{newsItem.source}</span>
                    <strong>{newsItem.title}</strong>
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
}
