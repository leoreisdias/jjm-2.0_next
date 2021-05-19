import React from 'react';

import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';

import { AdImage, CardAd } from './BigAdStyle';

export default function BigAd() {
  return (
    <CardAd>
      <CardActionArea>
        <AdImage>
          <Image
            width={150}
            height={150}
            objectFit="contain"
            src="https://jjm-upload.s3.amazonaws.com/Parceiros/donizete_pintor.png"
            alt="Advertise"
          />
        </AdImage>
        <CardContent>
          <h2>Donizete Pintor</h2>
          <p>
            Lizards are a widespread group of squamate reptiles, with over 6,000 species,
            ranging across all continents except Antarctica
          </p>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <FaFacebook size={20} />
        </Button>
        <Button size="small" color="primary">
          (35) 9 9999-9999
        </Button>
      </CardActions>
    </CardAd>
  );
}
