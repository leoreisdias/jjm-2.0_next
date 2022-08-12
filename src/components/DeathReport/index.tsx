import React, { useState, memo } from 'react';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import parseISO from 'date-fns/parseISO';
import dynamic from 'next/dynamic';
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

const CardContent = dynamic(() => import('@material-ui/core/CardContent'));
const CardActions = dynamic(() => import('@material-ui/core/CardActions'));
const CardActionArea = dynamic(() => import('@material-ui/core/CardActionArea'));
const Button = dynamic(() => import('@material-ui/core/Button'));
const Dialog = dynamic(() => import('@material-ui/core/Dialog'));

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

const POMBINHA_BRANCA =
  'https://jornaljm.s3.sa-east-1.amazonaws.com/BannerMetaTagsNotasFalecimento.webp';

const DeathReportCard = () => {
  const { colors } = useTheme();
  const { isAuthenticated } = useAuth();

  const { data } = useJJM<DeathReportsProps>('/deathreports?page=1');
  const [openNoteDetail, setOpenNoteDetail] = useState(false);
  const matches = useMediaQuery('(max-width:720px)');

  if (!data) {
    return null;
  }

  return (
    <CardAd>
      <CardActionArea onClick={() => setOpenNoteDetail(true)}>
        {!matches && (
          <AdImage>
            <Image
              width={150}
              height={150}
              objectFit="contain"
              blurDataURL={
                data.docs[0].imageURL !== '' ? data.docs[0].imageURL : POMBINHA_BRANCA
              }
              placeholder="blur"
              src={data.docs[0].imageURL !== '' ? data.docs[0].imageURL : POMBINHA_BRANCA}
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
              src={data.docs[0].imageURL !== '' ? data.docs[0].imageURL : POMBINHA_BRANCA}
              width={200}
              height={200}
              objectFit="contain"
              alt="Nota de Falecimento"
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
                <Link
                  href={{
                    pathname: `/writer-area`,
                    query: { update: formOptions.deathReport, id: data.docs[0]._id },
                  }}
                  as={'/writer-area'}
                >
                  <div>
                    <FaEdit size={25} color={colors.jjmPallete_1} className="icon" />
                  </div>
                </Link>
              )}
            </span>
          </DetailReportModal>
        </CustomDialogContent>
      </Dialog>
    </CardAd>
  );
};

export default memo(DeathReportCard);
