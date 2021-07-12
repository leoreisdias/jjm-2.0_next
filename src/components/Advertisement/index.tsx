import { useCallback, useEffect, useState } from 'react';

import { Dialog } from '@material-ui/core';
import Image from 'next/image';

import { api } from '../../services/api';
import { PartnerHighlightProps, PartnersProps } from '../../types/interfaces/Partners';
import BigAd from '../BigAd';
import { PartnerDetails } from '../PartnerDetails';
import { AdvertisementContainer, CustomDialogContent } from './AdvertisementStyle';

export function Advertisement() {
  const [partners, setPartners] = useState<PartnersProps[]>();

  const [partnerDetail, setPartnerDetail] = useState<PartnersProps>();

  const [lastTwoHighlights, setLastTwoHighlights] = useState<PartnerHighlightProps[]>();

  const [openPartnerModal, setOpenPartnerModal] = useState(false);

  const loadAdvertisments = useCallback(async () => {
    try {
      const { data } = await api.get('/partners');
      setPartners(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const loadLastTwoHighlights = useCallback(async () => {
    try {
      const { data } = await api.get('/partnershighlight');
      setLastTwoHighlights(data.slice(0, 2));
    } catch (err) {
      console.log(err);
    }
  }, []);

  function handleModalPartnerDetail(index: number) {
    setPartnerDetail(partners[index]);
    setOpenPartnerModal(true);
  }

  useEffect(() => {
    loadAdvertisments();
    loadLastTwoHighlights();
  }, [loadAdvertisments, loadLastTwoHighlights]);

  return (
    <AdvertisementContainer>
      {lastTwoHighlights && (
        <>
          <BigAd highlight={lastTwoHighlights[0]} />
          <BigAd highlight={lastTwoHighlights[1]} />
        </>
      )}
      <ul>
        {partners &&
          partners.map((partner, index) => {
            return (
              <li key={partner._id} onClick={() => handleModalPartnerDetail(index)}>
                <Image
                  width={150}
                  height={150}
                  objectFit="contain"
                  placeholder="blur"
                  blurDataURL={partner.imageURL}
                  src={partner.imageURL}
                  alt={partner.name}
                />
              </li>
            );
          })}
      </ul>
      <Dialog
        open={openPartnerModal}
        onClose={() => setOpenPartnerModal((oldOpenModal) => !oldOpenModal)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CustomDialogContent>
          <PartnerDetails partner={partnerDetail} />
        </CustomDialogContent>
      </Dialog>
    </AdvertisementContainer>
  );
}
