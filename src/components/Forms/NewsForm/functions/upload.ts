import { api } from '../../../../services/api';

export const uploadImageAWS = async (file: File | string | Blob, token: string) => {
  if (typeof file === 'string')
    return {
      link: '',
      key: '',
    };

  const form = new FormData();
  form.append('image', file);

  const { data } = await api.post('/upload-aws', form, {
    headers: {
      authorization: 'Bearer ' + token,
    },
    timeout: 10000,
  });

  return { link: data.link, key: data.key };
};
