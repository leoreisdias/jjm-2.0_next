import { FormEvent, useMemo, useState } from 'react';

import NoSsr from '@material-ui/core/NoSsr';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Select from 'react-select';
import * as Yup from 'yup';

import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/api';
import { Form, LabelEditor, LabelImageFile, SubmitButton } from './NewsFormStyle';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
}) as any;

interface SubjectsSelect {
  value: string;
  label: string;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
];

interface NewsFormProps {
  id?: string;
}

export const NewsForm = ({ id }: NewsFormProps) => {
  const { handleLoading } = useAuth();

  const isUpdating = id && id.length;

  const { push } = useRouter();

  const { username, token } = useAuth();

  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [subjects, setSubjects] = useState<SubjectsSelect[]>();

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [image, setImage] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);

  function handleFailedSubmitAlert() {
    setShowAlert(false);
  }

  function onEditorStateChange(editorState: EditorState) {
    setEditorState(editorState);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    setImage(event.currentTarget.files[0]);
  };

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : '';
  }, [image]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      image,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      summary,
      subjects: subjects ? subjects.map((item) => item.value) : [],
      source,
      video,
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
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      handleLoading();
      storeData();
    } catch (err) {
      //..
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
          setAlertMessage(error.message);
        });
      }
      setIsError(true);
      setShowAlert(true);
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
    data.append('author', username);
    data.append('summary', summary);
    data.append('video_url', video);
    data.append('source', source ?? 'JJM');

    try {
      await api.post('/news', data, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });
      setIsError(false);
      setAlertMessage('Notícia Postada com Sucesso');
      setShowAlert(true);
      push('/');
    } catch (err) {
      handleLoading();
      setIsError(true);
      setAlertMessage('Erro ao tentar cadastrar! Tente novamente daqui 5 minutos!');
      setShowAlert(true);
    }
  }

  function handleSelectTopics(e: SubjectsSelect[]) {
    setSubjects(e);
  }

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
          defaultValue={subjects}
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
        {!id.length && (
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
        )}
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

        <SubmitButton type="submit" onSubmit={handleSubmit}>
          Salvar Postagem
        </SubmitButton>
      </Form>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleFailedSubmitAlert}
      >
        <Alert severity={isError ? 'error' : 'success'}>
          {alertMessage}
          {/* Alguns dados estão faltando ou estão em formato errado! */}
        </Alert>
      </Snackbar>
    </NoSsr>
  );
};
