import Image from 'next/image';

import { AsideContainer } from './AsideStyle';

export function Aside() {
  return (
    <AsideContainer>
      <legend>Ultimas </legend>
      <ul>
        <li>
          <Image
            width={80}
            height={80}
            objectFit="cover"
            src="https://jjm-upload.s3.amazonaws.com/91584b97751525e38f64e683071cf570-csm_16122019LF1645_09ddd58135.jpg"
            alt=""
          />
          <span>Tag 1, Tag 2</span>
          <strong>Titulo da materia</strong>
          <hr />
        </li>
        <li>Noticia</li>
        <li>Noticia</li>
        <li>Noticia</li>
      </ul>
    </AsideContainer>
  );
}
