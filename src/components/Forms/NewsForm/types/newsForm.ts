type SubjectsSelect = {
  value: string;
  label: string;
};

type NewsFormProps = {
  id?: string;
};

type IFileProp = {
  key: string;
  isImageURL?: boolean;
  file: File | Blob | string;
};

export type { SubjectsSelect, NewsFormProps, IFileProp };
