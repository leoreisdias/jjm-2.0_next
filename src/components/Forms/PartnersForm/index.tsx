import { FormEvent, useEffect, useMemo, useState, useCallback } from 'react';

import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as Yup from 'yup';

import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/api';
import {
  Form,
  LabelImageFile,
  LabelEditor,
  SubmitButton,
  WarningBorders,
} from './PartnersFormStyle';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

interface PartnersFormPros {
  id?: string;
}

export const PartnersForm = ({ id }: PartnersFormPros) => {
  const { handleLoading, handleAlertMessage, callAlert } = useAuth();

  const isUpdating = useMemo(() => id && id.length, [id]);

  const { push, back } = useRouter();

  const { token } = useAuth();

  const [name, setName] = useState<string>('');
  const [facebook_url, setFacebookUrl] = useState<string>('');
  const [whatsapp_url, setWhatsappUrl] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [image, setImage] = useState('');
  const [paymentDay, setPaymentDay] = useState(0);

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

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
      text: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      name,
      image: isUpdating ? 'Updating' : image,
      facebook_url,
      whatsapp_url,
      telefone,
      endereco,
    };

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Faltando Nome do Parceiro!'),
        text: Yup.string().required('Faltando Texto do Parceiro!'),
        image: Yup.string().required('Faltando uma imagem!'),
        facebook_url: Yup.string(),
        whatsapp_url: Yup.string(),
        telefone: Yup.string().required('Telefone é obrigatório'),
        endereco: Yup.string().required('Endereço é obrigatório'),
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
    const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const data = new FormData();
    data.append('image', image);
    data.append('text', text);
    data.append('name', name);
    data.append('facebook_url', facebook_url);
    data.append(
      'whatsapp_url',
      whatsapp_url.replaceAll(/[^\d]/g, '').replaceAll(' ', '')
    );
    data.append('telefone', telefone);
    data.append('endereco', endereco);

    try {
      await api.post('/partners', data, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });
      handleAlertMessage('Parceiro Adicionado com Sucesso', false);
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
    const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const data = {
      text,
      name,
      facebook_url,
      whatsapp_url: whatsapp_url.replaceAll(/[^\d]/g, '').replaceAll(' ', ''),
      telefone,
      endereco,
      paymentDay,
    };

    try {
      await api.patch(`/partners/${id}`, data, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });

      handleAlertMessage('Parceiro Atualizado com Sucesso', false);
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

  const getPartnerById = useCallback(
    async (id: string) => {
      handleLoading(true);

      try {
        const { data } = await api.get(`/findpartner/${id}`);
        if (data.partner) {
          setName(data.partner.name);
          setPaymentDay(data.partner.paymentDay);
          setFacebookUrl(data.partner.facebook_url);
          setWhatsappUrl(data.partner.whatsapp_url);
          setTelefone(data.partner.telefone);
          setEndereco(data.partner.endereco);
          const blocksFromHTML = convertFromHTML(data.partner.text);
          const stateEditor = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );
          setEditorState(EditorState.createWithContent(stateEditor));
        }
        handleLoading(false);
      } catch (err) {
        handleLoading(false);
      }
    },
    [handleLoading]
  );

  useEffect(() => {
    if (isUpdating) getPartnerById(id);
  }, [getPartnerById, id, isUpdating]);

  return (
    <NoSsr>
      <Form onSubmit={handleSubmit}>
        <TextField
          error={false}
          variant="outlined"
          id="Title"
          label="Nome do Parceiro"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText=""
          required
        />
        {isUpdating && (
          <TextField
            error={false}
            variant="outlined"
            id="paymentDay"
            label="Dia do mês de Vencimento"
            name="payment"
            type="number"
            value={paymentDay}
            onChange={(e) => setPaymentDay(Number(e.target.value))}
            helperText=""
            required
          />
        )}
        <TextField
          error={false}
          variant="outlined"
          id="phone"
          name="phone"
          label="Telefone do Parceiro"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          helperText="Coloque o DDD antes. Ex.: 359xxxxxxx"
          required
        />
        <TextField
          error={false}
          variant="outlined"
          id="address"
          name="address"
          label="Endereço do Parceiro"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          helperText="Endereço completo"
          required
        />
        <TextField
          error={false}
          variant="outlined"
          id="facebook"
          name="facebook"
          label="Link do Facebook do Parceiro"
          value={facebook_url}
          onChange={(e) => setFacebookUrl(e.target.value)}
          helperText="A URL"
        />
        <TextField
          error={false}
          variant="outlined"
          id="whatsapp"
          name="whatsapp"
          label="WhatsApp do Parceiro"
          value={whatsapp_url}
          onChange={(e) => setWhatsappUrl(e.target.value)}
          helperText="Incluindo o DDD"
        />

        <LabelEditor htmlFor="Editor">
          <strong>Texto do Parceiro</strong>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </LabelEditor>
        <WarningBorders>
          Certifique-se do texto estar dentro das bordas pretas abaixo!
        </WarningBorders>
        <details open>
          <summary>Veja como será exibido o seu texto:</summary>
          <p
            dangerouslySetInnerHTML={{
              __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            }}
          />
        </details>
        {!isUpdating && (
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

        <SubmitButton type="submit" onSubmit={handleSubmit}>
          {isUpdating ? 'Atualizar Parceiro' : 'Salvar Novo Parceiro'}
        </SubmitButton>
      </Form>
    </NoSsr>
  );
};
