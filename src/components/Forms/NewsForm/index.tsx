import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Select from 'react-select';
import * as Yup from 'yup';

import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/api';
import {
  Form,
  LabelEditor,
  LabelImageFile,
  SubmitButton,
  CurrentImageLabel,
} from './NewsFormStyle';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

interface SubjectsSelect {
  value: string;
  label: string;
}

const options = [
  { value: 'covid', label: 'covid' },
  { value: 'governo', label: 'governo' },
  { value: 'mundo', label: 'mundo' },
  { value: 'pop', label: 'pop' },
  { value: 'bts', label: 'bts' },
  { value: 'muzambinho', label: 'muzambinho' },
  { value: 'minas gerais', label: 'minas gerais' },
  { value: 'brasil', label: 'brasil' },
  { value: 'copa do mundo', label: 'copa do mundo' },
  { value: 'saude', label: 'saude' },
  { value: 'esporte', label: 'esporte' },
  { value: 'lazer', label: 'lazer' },
  { value: 'jogos', label: 'jogos' },
  { value: 'animes', label: 'animes' },
  { value: 'filmes', label: 'filmes' },
  { value: 'series', label: 'series' },
  { value: 'livros', label: 'livros' },
  { value: 'acidente', label: 'acidente' },
  { value: 'policia', label: 'policia' },
  { value: 'assalto', label: 'assalto' },
  { value: 'politica', label: 'politica' },
  { value: 'eleição', label: 'eleição' },
  { value: 'economia', label: 'economia' },
  { value: 'finança', label: 'finança' },
  { value: 'zona rural', label: 'zona rural' },
  { value: 'projeto', label: 'projeto' },
  { value: 'televisão', label: 'televisão' },
  { value: 'musica', label: 'musica' },
  { value: 'estrada', label: 'estrada' },
  { value: 'protesto', label: 'protesto' },
  { value: 'ATO', label: 'ATO' },
  { value: 'povo', label: 'povo' },
  { value: 'LOTERICA SUA CASA', label: 'LOTERICA SUA CASA' },
  { value: 'LOTERICA', label: 'LOTERICA' },
  { value: 'APOSTAS', label: 'APOSTAS' },
  { value: 'MEGA SENA', label: 'MEGA SENA' },
  { value: 'LOTO FACIL', label: 'LOTO FACIL' },
  { value: 'DUPLA SENA', label: 'DUPLA SENA' },
  { value: 'QUINA', label: 'QUINA' },
];

interface NewsFormProps {
  id?: string;
}

export const NewsForm = ({ id }: NewsFormProps) => {
  const { handleLoading, handleAlertMessage, callAlert, username, token } = useAuth();

  const isUpdating = id && id.length;

  const { push, back } = useRouter();

  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [subjects, setSubjects] = useState<SubjectsSelect[]>();
  const [author, setAuthor] = useState<string>(
    username && username != 'undefined' ? username : ''
  );

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [image, setImage] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  function onEditorStateChange(editorState: EditorState) {
    setEditorState(editorState);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    if (event.currentTarget.files[0].size >= 5000000) {
      handleAlertMessage(
        'Imagem grande demais! Escolha uma de até no máximo 5 MB!',
        true
      );
      callAlert();
      setImage('');
    } else setImage(event.currentTarget.files[0]);
  };

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : '';
  }, [image]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      image: isUpdating ? 'Updating' : image,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      summary,
      subjects: subjects ? subjects.map((item) => item.value) : [],
      source,
      video,
      author,
    };

    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('Faltando Título da Matéria'),
        image: Yup.string().required('Faltando uma imagem!'),
        description: Yup.string().required('Faltando a descrição da notícia!'),
        subjects: Yup.array(Yup.string())
          .required('Palavras Chaves da notícia são obrigatórios!')
          .test(
            'IsEmpty',
            'Você não colocou nenhuma palavra chave para a notícia!',
            (value) => {
              return value.length != 0;
            }
          ),
        summary: Yup.string().required('Um resumo da notícia é necessário!'),
        source: Yup.string(),
        video: Yup.string(),
        author: Yup.string().required('Confirme seu nome como Autor!'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      handleLoading(true);

      if (isUpdating) updateData();
      else storeData();
    } catch (err) {
      //..
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
          handleAlertMessage(error.message, true);
        });
      }
      callAlert();
    }
    //..
  }

  async function storeData() {
    const description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const subjectsString = subjects.map((item) => item.value).join(', ');

    const data = new FormData();
    data.append('image', image);
    data.append('title', title);
    data.append('description', description);
    data.append('date', String(new Date()));
    data.append('subjects', subjectsString);
    data.append('summary', summary);
    data.append('video_url', video);
    data.append('author', author);
    data.append('source', source ?? 'JJM');

    try {
      await api.post('/news', data, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });
      handleAlertMessage('Notícia Postada com Sucesso', false);
      callAlert();
      push('/');
      handleLoading(false);
    } catch (err) {
      handleLoading(false);
      handleAlertMessage(
        'Erro ao tentar cadastrar! Tente novamente daqui 5 minutos!',
        true
      );
      callAlert();
    }
  }

  async function updateData() {
    const description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const subjectsString = subjects.map((item) => item.value).join(', ');

    const data = new FormData();
    data.append('image', image);
    data.append('title', title);
    data.append('description', description);
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
      });
      handleAlertMessage('Notícia Atualizada com Sucesso', false);
      callAlert();
      back();
      handleLoading(false);
    } catch (err) {
      handleLoading(false);
      handleAlertMessage(
        'Erro ao tentar cadastrar! Tente novamente daqui 5 minutos!',
        true
      );
      callAlert();
    }
  }

  function handleSelectTopics(e: SubjectsSelect[]) {
    setSubjects(e);
  }

  const getNewsById = useCallback(
    async (id: string) => {
      handleLoading(true);

      try {
        const { data } = await api.get(`/detail?id=${id}`);

        if (data.news) {
          setTitle(data.news.title);
          setSummary(data.news.summary);
          setSource(data.news.source);
          setVideo(data.news.video_url ?? '');
          setCurrentImageUrl(data.news.imageURL);
          setAuthor(data.news.author == 'undefined' ? '' : data.news.author);
          const blocksFromHTML = convertFromHTML(data.news.description);
          const stateEditor = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );
          setEditorState(EditorState.createWithContent(stateEditor));

          const topics = data.news.subjects.map((item) => {
            return {
              value: item,
              label: item,
            };
          });

          setSubjects(topics);
        }
        handleLoading(false);
      } catch (err) {
        handleLoading(false);
      }
    },
    [handleLoading]
  );

  useEffect(() => {
    if (isUpdating) getNewsById(id);
  }, [getNewsById, id, isUpdating]);

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
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
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
        <LabelImageFile
          // id={styles.image}
          style={{
            backgroundImage: `url(${preview})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
          // className={image ? styles.hasImage : styles.noImage}
          hasImage={!!image}
        >
          <input type="file" onChange={handleChange} />
          <img src="/camera.svg" alt="Select" />
        </LabelImageFile>

        <CurrentImageLabel>
          {isUpdating && currentImageUrl.length && (
            <>
              <strong>Imagem Atual do Destaque</strong>
              <Image
                width={200}
                height={200}
                placeholder="blur"
                blurDataURL={currentImageUrl}
                objectFit="contain"
                src={currentImageUrl}
                alt="Imagem da Noticia"
              />
            </>
          )}
        </CurrentImageLabel>
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
