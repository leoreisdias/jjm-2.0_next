import React from 'react';

import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';

import { PartnerHighlightProps } from '../../types/interfaces/Partners';
import { AdImage, CardAd } from './BigAdStyle';

interface BigAdProps {
  highlight: PartnerHighlightProps;
}

export default function BigAd({ highlight }: BigAdProps) {
  return (
    <CardAd>
      <CardActionArea>
        <AdImage>
          <Image
            width={150}
            height={150}
            objectFit="contain"
            placeholder="blur"
            blurDataURL={highlight.imageURL}
            src={highlight.imageURL}
            alt={highlight.title}
          />
        </AdImage>
        <CardContent>
          <h2>{highlight.title}</h2>
          <p>{highlight.text}</p>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {highlight.partner}
        </Button>
      </CardActions>
    </CardAd>
  );
}
