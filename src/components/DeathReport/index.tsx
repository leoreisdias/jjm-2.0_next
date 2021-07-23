import React, { useState } from 'react';

import { Dialog, useMediaQuery } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import parseISO from 'date-fns/parseISO';
import Image from 'next/image';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';

import { useAuth } from '../../hooks/useAuth';
import { useJJM } from '../../hooks/useJJM';
import { useTheme } from '../../hooks/useTheme';
import { formOptions } from '../../types/formOptions';
import {
  AdImage,
  CardAd,
  CustomDialogContent,
  DetailReportModal,
} from './DeathReportStyle';

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
  const { colors } = useTheme();
  const { isAuthenticated } = useAuth();

  const { data } = useJJM<DeathReportsProps>('/deathreports?page=1');
  const [openNoteDetail, setOpenNoteDetail] = useState(false);
  const matches = useMediaQuery('(max-width:720px)');

  // const;
  if (!data) {
    return <div></div>;
  }

  const pombinhaBrancaUrl =
    'https://jjm-upload.s3.amazonaws.com/Parceiros/BannerMetaTagsNotasFalecimento.png';

  return (
    <CardAd>
      <CardActionArea onClick={() => setOpenNoteDetail(true)}>
        {!matches && (
          <AdImage>
            <Image
              width={150}
              height={150}
              objectFit="contain"
              blurDataURL={data.docs[0].imageURL ?? pombinhaBrancaUrl}
              placeholder="blur"
              src={data.docs[0].imageURL ?? pombinhaBrancaUrl}
              alt="Advertise"
            />
          </AdImage>
        )}
        <CardContent>
          <h3>Funerária São Dimas Informa</h3>
          <p>{data.docs[0].name}</p>
        </CardContent>
      </CardActionArea>
      {!matches && (
        <CardActions>
          <Button size="small" color="primary">
            {format(parseISO(data.docs[0].createdAt), 'dd/MM/yyyy', {
              locale: ptBR,
            })}
          </Button>
        </CardActions>
      )}
      <Dialog
        open={openNoteDetail}
        onClose={() => setOpenNoteDetail((oldOpenModal) => !oldOpenModal)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CustomDialogContent>
          <DetailReportModal>
            <h3>Funerária São Dimas Informa</h3>
            <Image
              src={data.docs[0].imageURL}
              width={200}
              height={200}
              objectFit="contain"
            />
            <strong>{data.docs[0].name}</strong>
            <span>
              {format(parseISO(data.docs[0].createdAt), 'dd/MM/yyyy', {
                locale: ptBR,
              })}
            </span>
            <p>{data.docs[0].description}</p>
            <span>
              {isAuthenticated && (
                <>
                  <Link
                    href={{
                      pathname: `/writer-area`,
                      query: { update: formOptions.deathReport, id: data.docs[0]._id },
                    }}
                    as={'/writer-area'}
                  >
                    <FaEdit size={25} color={colors.jjmPallete_1} className="icon" />
                  </Link>
                </>
              )}
            </span>
          </DetailReportModal>
        </CustomDialogContent>
      </Dialog>
    </CardAd>
  );
}
