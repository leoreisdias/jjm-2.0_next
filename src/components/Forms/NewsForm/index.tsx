import { FormEvent, useMemo, useState } from 'react';

import NoSsr from '@material-ui/core/NoSsr';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Select from 'react-select';
import * as Yup from 'yup';

import { useAuth } from '../../../hooks/useAuth';
import { Form, LabelEditor, LabelImageFile, SubmitButton } from './NewsFormStyle';

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

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const NewsForm = () => {
  const { username } = useAuth();

  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [video, setVideo] = useState<string>('');

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [image, setImage] = useState('');

  const [hasSubmitFailed, setHasSubmitFailed] = useState(false);

  function handleFailedSubmitAlert() {
    setHasSubmitFailed(false);
  }

  function onEditorStateChange(editorState: any) {
    setEditorState(editorState);
  }

  const handleChange = (event: any) => {
    setImage(event.currentTarget.files[0]);
  };

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : '';
  }, [image]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log('ere');

    // const data = {
    //   title,
    //   image,
    //   // description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    //   summary,
    //   source,
    //   video,
    //   date: new Date(),
    // };

    // try {
    //   const schema = Yup.object().shape({
    //     title: Yup.string().required(),
    //     image: Yup.string().required(),
    //     description: Yup.string().required(),
    //     summary: Yup.string().required(),
    //     source: Yup.string(),
    //     video: Yup.string(),
    //   });
    //   await schema.validate(data, {
    //     abortEarly: false,
    //   });

    //   alert('Passou');
    // } catch (err) {
    //   //..
    //   setHasSubmitFailed(true);
    // }
    //..
  }

  return (
    <NoSsr>
      <Form
        onSubmit={() => {
          console.log('2');
        }}
      >
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
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Tópicos da Matéria"
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

        {/* <LabelEditor htmlFor="Editor">
          <strong>Descrição da Matéria</strong>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </LabelEditor> */}
        {/* <p
          dangerouslySetInnerHTML={{
            __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          }}
        /> */}
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
          <input type="file" onChange={handleChange} required />
          <img src="/camera.svg" alt="Select" />
        </LabelImageFile>

        <TextField
          error={false}
          variant="outlined"
          id="Video"
          name="video"
          label="URL do Vídeo"
          defaultValue="Hello World"
          helperText="Se houver (OPCIONAL)"
        />

        <SubmitButton type="submit">Salvar Postagem</SubmitButton>
      </Form>
      <Snackbar
        open={hasSubmitFailed}
        autoHideDuration={6000}
        onClose={handleFailedSubmitAlert}
      >
        <Alert severity="error">
          Alguns dados estão faltando ou estão em formato errado!
        </Alert>
      </Snackbar>
    </NoSsr>
  );
};
