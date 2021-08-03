import React, { useState } from 'react';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';

import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { formOptions } from '../../types/formOptions';
import { PartnerHighlightProps } from '../../types/interfaces/Partners';
import { AdImage, CardAd, CustomDialogContent, DetailHighlightModal } from './BigAdStyle';

const CardContent = dynamic(() => import('@material-ui/core/CardContent'));
const CardActions = dynamic(() => import('@material-ui/core/CardActions'));
const CardActionArea = dynamic(() => import('@material-ui/core/CardActionArea'));
const Button = dynamic(() => import('@material-ui/core/Button'));
const Dialog = dynamic(() => import('@material-ui/core/Dialog'));

interface BigAdProps {
  highlight: PartnerHighlightProps;
}

export default function BigAd({ highlight }: BigAdProps) {
  const { colors } = useTheme();
  const { isAuthenticated } = useAuth();

  const [openHighlightDetail, setOpenHighlightDetail] = useState(false);
  const matches = useMediaQuery('(max-width:720px)');

  return (
    <CardAd>
      <CardActionArea onClick={() => setOpenHighlightDetail(true)}>
        {!matches && (
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
        )}
        <CardContent>
          <h2>{highlight.title}</h2>
          <p>{highlight.summary}</p>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Button size="small" color="primary" style={{ fontSize: '0.75rem' }}>
          {highlight.partner}
        </Button>
      </CardActions>
      <Dialog
        open={openHighlightDetail}
        onClose={() => setOpenHighlightDetail((oldOpenModal) => !oldOpenModal)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CustomDialogContent>
          <DetailHighlightModal>
            <h2>{highlight.title}</h2>
            <p>{highlight.text}</p>
            {highlight.videoURL && (
              <Link href={highlight.videoURL} passHref>
                Veja o vídeo!
              </Link>
            )}
            <Image
              src={highlight.imageURL}
              width={200}
              height={200}
              objectFit="contain"
              alt="Destaque de Patronicio"
            />
            <strong>{highlight.partner}</strong>
            <span>
              {isAuthenticated && (
                <>
                  <Link
                    href={{
                      pathname: `/writer-area`,
                      query: { update: formOptions.partnersHighlight, id: highlight._id },
                    }}
                    as={'writer-area'}
                  >
                    <span>
                      <FaEdit size={25} color={colors.jjmPallete_1} className="icon" />
                      EDITAR
                    </span>
                  </Link>
                </>
              )}
            </span>
          </DetailHighlightModal>
        </CustomDialogContent>
      </Dialog>
    </CardAd>
  );
}
