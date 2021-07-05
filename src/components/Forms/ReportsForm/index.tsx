import { FormEvent, useMemo, useState } from 'react';

import NoSsr from '@material-ui/core/NoSsr';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as Yup from 'yup';

import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/api';
import { Form, LabelImageFile, Warning, SubmitButton } from './ReportsFormStyle';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ReportsForm = () => {
  const { handleLoading } = useAuth();

  const { push } = useRouter();

  const { token } = useAuth();

  const [title, setTitle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);

  function handleFailedSubmitAlert() {
    setShowAlert(false);
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
      name,
      image,
      description,
    };

    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('Faltando Título da Nota!'),
        image: Yup.string().required('Faltando uma imagem!'),
        description: Yup.string().required('Faltando a descrição da nota!'),
        name: Yup.string().required('Nome é obrigatório!'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      console.log('deu certo');
      handleLoading(true);
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
    const data = new FormData();
    data.append('reportImage', image);
    data.append('title', title);
    data.append('description', description);
    data.append('name', name);
    data.append('date', String(new Date()));

    try {
      await api.post('/news', data, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });
      setIsError(false);
      setAlertMessage('Nota postada com Sucesso');
      setShowAlert(true);
      push('/');
      handleLoading(false);
    } catch (err) {
      handleLoading(false);
      setIsError(true);
      setAlertMessage('Erro ao tentar cadastrar! Tente novamente daqui 5 minutos!');
      setShowAlert(true);
    }
  }

  return (
    <NoSsr>
      <Form onSubmit={handleSubmit}>
        <TextField
          error={false}
          variant="outlined"
          id="Title"
          label="Título (Funerária São Dimas informa)"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          helperText=""
          required
        />
        <TextField
          error={false}
          variant="outlined"
          id="Name"
          name="name"
          label="Nome do Falecido"
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText=""
          required
        />

        <TextField
          id="outlined-multiline-static"
          label="Descrição da Nota"
          multiline
          rows={6}
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          required
        />

        <Warning>
          Lembre-se! Postar imagem somente do falecido! Caso não poste, aparecerá o pombo!
        </Warning>
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

        <SubmitButton type="submit" onSubmit={handleSubmit}>
          Salvar Nota
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
