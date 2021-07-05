import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import { api } from '../../services/api';
import { PartnerHighlightProps, PartnersProps } from '../../types/interfaces/Partners';
import BigAd from '../BigAd';
import { AdvertisementContainer } from './AdvertisementStyle';

export function Advertisement() {
  const [partners, setPartners] = useState<PartnersProps[]>();

  const [lastTwoHighlights, setLastTwoHighlights] = useState<PartnerHighlightProps[]>();

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
      console.log(data.slice(0, 2));
      setLastTwoHighlights(data.slice(0, 2));
    } catch (err) {
      console.log(err);
    }
  }, []);

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
          partners.map((partner) => {
            return (
              <li key={partner._id}>
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
    </AdvertisementContainer>
  );
}
