import React from 'react';

import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import parseISO from 'date-fns/parseISO';
import Image from 'next/image';
import Link from 'next/link';

import { useJJM } from '../../hooks/useFetch';
import { AdImage, CardAd } from './DeathReportStyle';

interface Reports {
  _id: string;
  createdAt: string;
  date: string;
  description: string;
  imageURL: string;
  name: string;
  title: string;
}

interface DeathReportsProps {
  docs: Reports[];
}

export default function DeathReportCard() {
  const { data } = useJJM<DeathReportsProps>('/deathreports?page=1');

  // const;
  if (!data) {
    return <div></div>;
  }

  return (
    <CardAd>
      <Link href={`report-detail/${data.docs[0]._id}`}>
        <CardActionArea>
          <AdImage>
            <Image
              width={150}
              height={150}
              objectFit="contain"
              src={data.docs[0].imageURL}
              alt="Advertise"
            />
          </AdImage>
          <CardContent>
            <h3>Funerária São Dimas Informa</h3>
            <p>{data.docs[0].name}</p>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary">
          {format(parseISO(data.docs[0].createdAt), 'dd/MM/yyyy', {
            locale: ptBR,
          })}
        </Button>
      </CardActions>
    </CardAd>
  );
}
