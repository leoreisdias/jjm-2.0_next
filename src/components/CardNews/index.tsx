import Image from 'next/image';

import { Card } from './CardNewsStyle';

export function CardNews() {
  return (
    <Card>
      <Image
        width={720}
        height={600}
        objectFit="cover"
        src="https://jjm-upload.s3.amazonaws.com/91584b97751525e38f64e683071cf570-csm_16122019LF1645_09ddd58135.jpg"
        alt=""
      />
      <small>Por: Leonardo - Data</small>
      <h3>FASTÃO ESTÁ INDO PARA TV BANDEIRANTE</h3>
      <p>
        Faustão que fez parte do Sistema Globo de Rádio, não vai se aposentar em 2022
        Faustão que fez parte do Sistema Globo de Rádio, não vai se aposentar
      </p>
      <hr />
      <p>Tag 1, Tag 2</p>
    </Card>
  );
}
