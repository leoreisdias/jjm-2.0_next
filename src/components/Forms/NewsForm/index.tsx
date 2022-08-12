import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import { MdDelete } from 'react-icons/md';
import Select from 'react-select';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

import { b64toBlob } from '../../../helpers/file';
import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/api';
import CustomEditor from '../../Editor';
import { options } from './constants/subjects';
import { MAX_IMAGE_SIZE } from './constants/upload';
import { uploadImageAWS } from './functions/upload';
import {
  Form,
  LabelEditor,
  LabelImageFile,
  SubmitButton,
  PreviewImageFile,
  ImagesContainer,
} from './NewsFormStyle';
import { IFileProp, NewsFormProps, SubjectsSelect } from './types/newsForm';

export const NewsForm = ({ id }: NewsFormProps) => {
  const { handleLoading, handleAlertMessage, callAlert, username, token } = useAuth();

  const isUpdating = !!id;

  const { push, back } = useRouter();

  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [subjects, setSubjects] = useState<SubjectsSelect[]>();

  const [author, setAuthor] = useState<string>(username ?? '');

  const [editorState, setEditorState] = useState<string>('');
  const [image, setImage] = useState<IFileProp[]>([]);

  const imageDeleteHash = useRef<string>('');

  function onEditorStateChange(editorState: string) {
    setEditorState(editorState);
  }

  const handleImageChange = (event: { currentTarget: HTMLInputElement }) => {
    const files = Array.from(event.currentTarget.files);

    if (files.some((file: File) => file.size >= MAX_IMAGE_SIZE)) {
      handleAlertMessage(
        'Uma das imagens é grande demais! Escolha uma de até no máximo 5 MB!',
        true
      );
      callAlert();
    } else {
      const newImages = files.map((file: File) => ({
        key: uuid(),
        file,
      }));

      setImage((oldImages) => [...oldImages, ...newImages]);
    }
  };

  const handleRemoveImage = (key: string) => {
    setImage((oldImages) => oldImages.filter((image) => image.key !== key));
  };

  const preview = useMemo(() => {
    if (image?.length > 0)
      return image.map((item) => {
        if (typeof item.file === 'string' || item.isImageURL) {
          return {
            src: item.file as string,
            key: item.key,
          };
        }

        return {
          key: item.key,
          src: URL.createObjectURL(item.file),
        };
      });
    return [];
  }, [image]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      image: image.length === 0 ? null : image.map((item) => item.key),
      description: editorState,
      summary,
      subjects: subjects ? subjects.map((item) => item.value) : [],
      source,
      video,
      author,
    };

    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('Faltando Título da Matéria'),
        image: Yup.array()
          .required('Faltando Imagem')
          .typeError('Imagem inválida ou inexistente.'),
        description: Yup.string().required('Faltando a descrição da notícia!'),
        subjects: Yup.array(Yup.string())
          .required('Palavras Chaves da notícia são obrigatórios!')
          .test(
            'IsEmpty',
            'Você não colocou nenhuma palavra chave para a notícia!',
            (value) => {
              return value?.length != 0;
            }
          ),
        summary: Yup.string().required('Um resumo da notícia é necessário!'),
        source: Yup.string(),
        video: Yup.string(),
        author: Yup.string().min(3).required('Confirme seu nome como Autor!'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      handleLoading(true);

      if (isUpdating) updateData();
      else storeData();
    } catch (err) {
      handleLoading(false);
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
          handleAlertMessage(error.message, true);
        });
      }
      callAlert();
    }
  }

  const tryToUploadImage = async (imageToUploadAWS: File | Blob | string) => {
    try {
      const uploadedImage = await uploadImageAWS(imageToUploadAWS, token);

      return uploadedImage;
    } catch (err) {
      handleAlertMessage(
        'Erro ao fazer Upload da PRIMEIRA imagem, verifique o tamanho e formato.',
        true
      );
      callAlert();
      throw err;
    }
  };

  async function storeData() {
    try {
      const subjectsString = subjects.map((item) => item.value).join(', ');

      const imageToUploadAWS = image[0].file;
      const uploadedImage = await tryToUploadImage(imageToUploadAWS);

      const data = new FormData();
      image.forEach((item, index) => index !== 0 && data.append('image', item.file));
      data.append('title', title);
      data.append('awsLink', uploadedImage.link);
      data.append('awsKey', uploadedImage.key);
      data.append('description', editorState);
      data.append('date', String(new Date()));
      data.append('subjects', subjectsString);
      data.append('summary', summary);
      data.append('video_url', video);
      data.append('author', author);
      data.append('source', source ?? 'JJM');

      await api.post('/news', data, {
        headers: {
          authorization: 'Bearer ' + token,
        },
        timeout: 10000,
      });
      handleAlertMessage('Notícia Postada com Sucesso', false);
      callAlert();
      push('/');
      handleLoading(false);
    } catch (err) {
      handleLoading(false);
      handleAlertMessage('Erro ao tentar cadastrar!', true);
      callAlert();
    }
  }

  async function updateData() {
    const subjectsString = subjects.map((item) => item.value).join(', ');

    const hasImageURL = image.some((item) => item.isImageURL);

    const data = new FormData();

    if (!hasImageURL) {
      const imageToUploadAWS = image[0].file;
      const uploadedImage = await tryToUploadImage(imageToUploadAWS);

      data.append('awsLink', uploadedImage.link);
      data.append('awsKey', uploadedImage.key);
      data.append('imageDeleteHash', imageDeleteHash.current);
    }

    image.forEach((item) => !item.isImageURL && data.append('image', item.file));
    data.append('title', title);
    data.append('description', editorState);
    data.append('subjects', subjectsString);
    data.append('summary', summary);
    data.append('video_url', video);
    data.append('author', author);
    data.append('source', source ?? 'JJM');

    try {
      await api.patch(`/news/${id}`, data, {
        headers: {
          authorization: 'Bearer ' + token,
        },
        timeout: 10000,
      });
      handleAlertMessage('Notícia Atualizada com Sucesso', false);
      callAlert();
      back();
      handleLoading(false);
    } catch (err) {
      handleLoading(false);
      handleAlertMessage('Erro ao tentar atualizar!', true);
      callAlert();
    }
  }

  function handleSelectTopics(e: SubjectsSelect[]) {
    setSubjects(e);
  }

  useEffect(() => {
    const loadData = async () => {
      handleLoading(true);
      try {
        const { data } = await api.get(`/detail-update?id=${id}`);

        if (data.news) {
          setTitle(data.news.title);
          setSummary(data.news.summary);
          setSource(data.news.source);
          setVideo(data.news.video_url ?? '');
          setAuthor(data.news.author ?? username ?? '');

          setEditorState(data.news.description);

          const topics = data.news.subjects.map((item: string) => {
            return {
              value: item,
              label: item,
            };
          });
          setSubjects(topics);

          imageDeleteHash.current = data.news.imageDeleteHash;

          const files: IFileProp[] = data.news.image.map((item: string) => {
            const file = b64toBlob(item);
            return {
              key: uuid(),
              file,
            };
          });

          setImage([
            {
              key: uuid(),
              isImageURL: true,
              file: data.news.imageURL,
            },
            ...files,
          ]);
        }
        handleLoading(false);
      } catch (err) {
        handleLoading(false);
      }
    };

    if (isUpdating) loadData();
  }, [handleLoading, id, isUpdating, username]);

  return (
    <NoSsr>
      <Form onSubmit={handleSubmit}>
        <TextField
          error={false}
          variant="outlined"
          id="Title"
          label="Título da Matéria"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          helperText=""
          required
        />
        <Select
          isMulti
          name="options"
          options={options}
          value={subjects}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Palavras-Chaves da Matéria"
          onChange={handleSelectTopics}
        />
        <TextField
          error={false}
          variant="outlined"
          id="Summary"
          name="summary"
          label="Resumo da Matéria"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          helperText=""
          required
        />

        <LabelEditor htmlFor="Editor">
          <strong>Descrição da Matéria</strong>
          <CustomEditor onChange={onEditorStateChange} text={editorState} />
        </LabelEditor>

        <TextField
          error={false}
          variant="outlined"
          id="Source"
          name="source"
          label="Fonte da Notícia"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          helperText="Se houver (OPCIONAL)"
        />
        <ImagesContainer>
          {preview.map((item) => (
            <PreviewImageFile key={item.key}>
              <img src={item.src} alt="preview" />
              <MdDelete
                color="red"
                size={25}
                className="delete-icon"
                onClick={() => handleRemoveImage(item.key)}
              />
            </PreviewImageFile>
          ))}
          <LabelImageFile>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              multiple
            />
            <img src="/camera.svg" alt="Select" />
          </LabelImageFile>
        </ImagesContainer>
        <TextField
          error={false}
          variant="outlined"
          id="Video"
          name="video"
          label="URL do Vídeo"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          helperText="Se houver (OPCIONAL)"
        />
        <TextField
          error={false}
          variant="outlined"
          id="Author"
          name="author"
          label="Seu Nome (Redator)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          helperText="Confira seu nome se está aqui e correto"
        />

        <SubmitButton type="submit" onSubmit={handleSubmit}>
          Salvar Postagem
        </SubmitButton>
      </Form>
    </NoSsr>
  );
};
