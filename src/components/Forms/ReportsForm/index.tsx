import { FormEvent, useCallback, useMemo, useState, useEffect } from 'react';

import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Image from 'next/image';
import { useRouter } from 'next/router';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as Yup from 'yup';

import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/api';
import { Form, LabelImageFile, Warning, SubmitButton } from './ReportsFormStyle';

interface ReportFormPros {
  id?: string;
}

export const ReportsForm = ({ id }: ReportFormPros) => {
  const { handleLoading, handleAlertMessage, callAlert } = useAuth();

  const isUpdating = useMemo(() => id && id.length, [id]);

  const { push, back } = useRouter();

  const { token } = useAuth();

  const [title, setTitle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState('');

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
      name,
      image,
      description,
    };

    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('Faltando Título da Nota!'),
        image: Yup.string(),
        description: Yup.string().required('Faltando a descrição da nota!'),
        name: Yup.string().required('Nome é obrigatório!'),
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
    const data = new FormData();
    data.append('reportImage', image);
    data.append('title', title);
    data.append('description', description);
    data.append('name', name);
    data.append('date', String(new Date()));

    try {
      await api.post('/deathreports', data, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });
      handleAlertMessage('Nota postada com Sucesso', false);
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
    const data = {
      name,
      description,
      title,
    };

    try {
      await api.patch(`/reports/${id}`, data, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });

      handleAlertMessage('Nota Atualizada com Sucesso', false);
      callAlert();
      back();
      handleLoading(false);
    } catch (err) {
      handleLoading(false);
      handleAlertMessage(
        'Erro ao tentar atualizar! Tente novamente daqui 5 minutos!',
        true
      );
      callAlert();
    }
  }

  const getReportById = useCallback(
    async (id: string) => {
      handleLoading(true);

      try {
        const { data } = await api.get(`/reportDetail?id=${id}`);
        if (data.reports) {
          setName(data.reports.name);
          setTitle(data.reports.title);
          setDescription(data.reports.description);
        }
        handleLoading(false);
      } catch (err) {
        handleLoading(false);
      }
    },
    [handleLoading]
  );

  useEffect(() => {
    if (isUpdating) getReportById(id);
  }, [getReportById, id, isUpdating]);

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
          rows={8}
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          required
        />
        {!isUpdating && (
          <>
            <Warning>
              Lembre-se! Postar imagem somente do falecido! Caso não poste, aparecerá o
              pombo!
              <Image
                src={
                  'https://jornaljm.s3.sa-east-1.amazonaws.com/BannerMetaTagsNotasFalecimento.webp'
                }
                width={150}
                height={150}
                blurDataURL={
                  'https://jornaljm.s3.sa-east-1.amazonaws.com/BannerMetaTagsNotasFalecimento.webp'
                }
                placeholder="blur"
                objectFit="contain"
                alt="Example"
              />
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
          </>
        )}

        <SubmitButton type="submit" onSubmit={handleSubmit}>
          Salvar Nota
        </SubmitButton>
      </Form>
    </NoSsr>
  );
};
