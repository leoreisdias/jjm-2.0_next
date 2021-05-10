import Image from 'next/image';

import { LastPostsContainer } from './LastPosts';

export function LastPosts() {
  return (
    <>
      <LastPostsContainer>
        <Image
          width={100}
          height={100}
          objectFit="cover"
          src="https://jjm-upload.s3.amazonaws.com/91584b97751525e38f64e683071cf570-csm_16122019LF1645_09ddd58135.jpg"
          alt=""
        />
        <p>
          <span>Tag 1, Tag 2</span>
          <strong>Trip that you’ll never ever forget</strong>
        </p>
      </LastPostsContainer>
    </>
  );
}
