import { useCallback, useEffect, useState, memo } from 'react';

import { Dialog } from '@material-ui/core';
import { getDate } from 'date-fns';
import Image from 'next/image';

import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { PartnerHighlightProps, PartnersProps } from '../../types/interfaces/Partners';
import BigAd from '../BigAd';
import { PartnerDetails } from '../PartnerDetails';
import {
  AdvertisementContainer,
  CustomDialogContent,
  ExpiredPartners,
} from './AdvertisementStyle';

interface AdvertisementProps {
  reverse?: boolean;
  showSmallPartners: boolean;
}

const Advertisement = ({ reverse, showSmallPartners }: AdvertisementProps) => {
  const { isAuthenticated, username } = useAuth();

  const [partners, setPartners] = useState<PartnersProps[]>();

  const [dueDatePartners, setDueDatePartners] = useState<PartnersProps[]>();

  const [hasPartnersExpired, setHasPartnersExpired] = useState(false);

  const [partnerDetail, setPartnerDetail] = useState<PartnersProps>();

  const [lastTwoHighlights, setLastTwoHighlights] = useState<PartnerHighlightProps[]>();

  const [openPartnerModal, setOpenPartnerModal] = useState(false);

  const loadAdvertisments = useCallback(async () => {
    try {
      const { data } = await api.get('/partners');
      setPartners(data);

      if (isAuthenticated) {
        const dueDate = data.filter(
          (item: PartnersProps) => item.paymentDay == getDate(new Date())
        );
        setDueDatePartners(dueDate);
        if (dueDate.length) setHasPartnersExpired(true);
      }
    } catch (err) {
      //..
    }
  }, [isAuthenticated]);

  const loadLastTwoHighlights = useCallback(async () => {
    try {
      const { data } = await api.get('/partnershighlight');
      console.log(data);

      setLastTwoHighlights(data.slice(0, 2));
    } catch (err) {
      //..
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
    <AdvertisementContainer reverse={reverse}>
      {lastTwoHighlights && (
        <span>
          <BigAd highlight={lastTwoHighlights[0]} />
          <BigAd highlight={lastTwoHighlights[1]} />
        </span>
      )}
      {showSmallPartners && (
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
      )}
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
      <Dialog
        open={hasPartnersExpired}
        onClose={() => setHasPartnersExpired((oldOpenModal) => !oldOpenModal)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CustomDialogContent>
          <ExpiredPartners>
            <h4>Atenção {username}!</h4>
            <p>
              Esses patrocinios vencem hoje:
              <ul>
                {dueDatePartners &&
                  dueDatePartners.map((item) => {
                    return (
                      <li key={item._id}>
                        {item.name} / Dia {item.paymentDay}
                      </li>
                    );
                  })}
              </ul>
            </p>
          </ExpiredPartners>
        </CustomDialogContent>
      </Dialog>
    </AdvertisementContainer>
  );
};

export default memo(Advertisement);
