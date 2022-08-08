export const b64toBlob = (base64: string) => {
  const buffer = Buffer.from(base64, 'base64');
  const blob = new Blob([buffer], { type: 'image/jpeg' });

  return blob;
};
