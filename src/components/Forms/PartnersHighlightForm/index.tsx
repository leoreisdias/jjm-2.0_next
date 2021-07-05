import { FormEvent, useEffect, useMemo, useState, useCallback } from 'react';

import NoSsr from '@material-ui/core/NoSsr';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Select from 'react-select';
import * as Yup from 'yup';

import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/api';
import {
  Form,
  LabelImageFile,
  CurrentImageLabel,
  SubmitButton,
} from './PartnersHighlightFormStyle';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface PartnersHighlightFormPros {
  id?: string;
}

interface SelectOptions {
  value: string;
  label: string;
}

export const PartnersHightlightForm = ({ id }: PartnersHighlightFormPros) => {
  const { handleLoading } = useAuth();

  const isUpdating = useMemo(() => id && id.length, [id]);

  const { push } = useRouter();

  const { token } = useAuth();

  const [partnerOptions, setPartnerOptions] = useState<SelectOptions[]>();
  const [isLoading, setIsLoading] = useState(false);

  const [partner, setPartner] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState('');

  const [currentImageUrl, setCurrentImageUrl] = useState('');

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
      text,
      partner,
      title,
      image: isUpdating ? 'Sem Imagem' : image,
    };

    try {
      const schema = Yup.object().shape({
        partner: Yup.string().required('Faltando Nome do Parceiro!'),
        text: Yup.string().required('Faltando Texto do Destaque!'),
        title: Yup.string().required('Faltando Titulo do Destaque!'),
        image: Yup.string().required('Imagem faltando!'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      console.log('deu certo');

      handleLoading();
      if (isUpdating) updateData();
      else storeData();
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
    data.append('image', image);
    data.append('text', text);
    data.append('title', title);
    data.append('partner', partner);

    try {
      await api.post('/partnershighlight', data, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });
      setIsError(false);
      setAlertMessage('Destaque Adicionado com Sucesso');
      setShowAlert(true);
      handleLoading();
      push('/');
    } catch (err) {
      handleLoading();
      setIsError(true);
      setAlertMessage('Erro ao tentar cadastrar! Tente novamente daqui 5 minutos!');
      setShowAlert(true);
    }
  }

  async function updateData() {
    console.log(id);

    const data = new FormData();
    data.append('image', image);
    data.append('text', text);
    data.append('title', title);
    data.append('partner', partner);

    try {
      await api.patch(`/partnershighlight/${id}`, data, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });

      setIsError(false);
      setAlertMessage('Destaque Atualizado com Sucesso');
      setShowAlert(true);
      handleLoading();
      push('/');
    } catch (err) {
      handleLoading();
      setIsError(true);
      setAlertMessage('Erro ao tentar atualizar! Tente novamente daqui 5 minutos!');
      setShowAlert(true);
    }
  }

  const getPartnerHighlightById = useCallback(async (id: string) => {
    try {
      const { data } = await api.get(`/findpartnershighlight/${id}`);
      if (data.partnerHighlight) {
        console.log(data);

        setText(data.partnerHighlight.text);
        setTitle(data.partnerHighlight.title);
        setPartner(data.partnerHighlight.partner);
        setCurrentImageUrl(data.partnerHighlight.imageURL);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getPartnersList = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/partners');
      const availablePartners = data.map((partner) => {
        return {
          value: partner.name,
          label: partner.name,
        };
      });

      setPartnerOptions(availablePartners);

      setIsLoading(false);
      console.log(data);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (isUpdating) getPartnerHighlightById(id);
  }, [getPartnerHighlightById, id, isUpdating]);

  useEffect(() => {
    getPartnersList();
  }, [getPartnersList]);

  return (
    <NoSsr>
      <Form onSubmit={handleSubmit}>
        {!isUpdating && (
          <Select
            id="optionSelect"
            instanceId="options"
            className="basic-single"
            classNamePrefix="select"
            options={partnerOptions}
            isLoading={isLoading}
            onChange={(e) => setPartner(e.value)}
          />
        )}
        <TextField
          error={false}
          variant="outlined"
          id="Title"
          label="Nome do Parceiro"
          name="partner"
          value={partner}
          disabled={true}
          helperText=""
          required
        />
        <TextField
          error={false}
          variant="outlined"
          id="titulo"
          name="titulo"
          label="Titulo do Destaque"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          helperText=""
          required
        />

        <TextField
          id="outlined-multiline-static"
          label="Descrição do Destaque"
          multiline
          rows={6}
          defaultValue={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          required
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

        <SubmitButton type="submit" onSubmit={handleSubmit}>
          {isUpdating ? 'Atualizar Destaque' : 'Salvar Novo Destaque'}
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
