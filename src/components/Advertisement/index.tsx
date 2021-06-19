import Image from 'next/image';

import BigAd from '../BigAd';
import DeathReportCard from '../DeathReport';
import { AdvertisementContainer } from './AdvertisementStyle';

export function Advertisement() {
  return (
    <AdvertisementContainer>
      <BigAd />
      <ul>
        <li>
          <Image
            width={150}
            height={150}
            objectFit="contain"
            src="https://jjm-upload.s3.amazonaws.com/Parceiros/VilaBurger_logo.jpg"
            alt="Advertise"
          />
        </li>
        <li>
          <Image
            width={150}
            height={150}
            objectFit="contain"
            src="https://jjm-upload.s3.amazonaws.com/Parceiros/donizete_pintor.png"
            alt="Advertise"
          />
        </li>
        <li>
          <Image
            width={150}
            height={150}
            objectFit="contain"
            src="https://jjm-upload.s3.amazonaws.com/Parceiros/CentralCaf%C3%A9_white.jpeg"
            alt="Advertise"
          />
        </li>
      </ul>
    </AdvertisementContainer>
  );
}
