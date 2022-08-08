import { useState } from 'react';

import NoSsr from '@material-ui/core/NoSsr';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import Select from 'react-select';

import { NewsForm } from '../components/Forms/NewsForm';
import { PartnersForm } from '../components/Forms/PartnersForm';
import { PartnersHightlightForm } from '../components/Forms/PartnersHighlightForm';
import { ReportsForm } from '../components/Forms/ReportsForm';
import { useAuth } from '../hooks/useAuth';
import { WriterSection } from '../styles/pages/WriterArea';
import { formOptions } from '../types/formOptions';

type FormType = '' | 'news' | 'deathReport' | 'partners' | 'partnersHighlight';

interface WriterAreaServerProps {
  isUpdating: boolean;
  update: FormType;
  id: string;
}

export default function WriterArea({ id, isUpdating, update }: WriterAreaServerProps) {
  const { username } = useAuth();

  const [formType, setFormType] = useState<FormType | string>(update);

  const options = [
    { value: '', label: 'Escolher Opção' },
    { value: formOptions.news, label: 'Cadastrar Notícia' },
    { value: formOptions.deathReport, label: 'Cadastrar Nota de Falecimento' },
    { value: formOptions.partners, label: 'Cadastrar Novo Patrocínio' },
    { value: formOptions.partnersHighlight, label: 'Cadastrar Destaque de Patrocínio' },
  ];

  return (
    <NoSsr>
      <Head>
        <title>Area do Redator | JJM</title>
        <meta charSet="utf-8" />{' '}
      </Head>
      <WriterSection>
        <h3>Bem vindo {username}</h3>
        {!isUpdating && (
          <Select
            id="optionSelect"
            instanceId="options"
            className="basic-single"
            classNamePrefix="select"
            defaultValue={options[0]}
            options={options}
            onChange={(e) => setFormType(e.value)}
          />
        )}
        {formType == formOptions.news && <NewsForm id={id} />}
        {formType == formOptions.deathReport && <ReportsForm id={id} />}
        {formType == formOptions.partners && <PartnersForm id={id} />}
        {formType == formOptions.partnersHighlight && <PartnersHightlightForm id={id} />}
      </WriterSection>
    </NoSsr>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const query = ctx.query;

  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const isValidUpdate =
    query.update == 'news' ||
    query.update == 'deathReport' ||
    query.update == 'partners' ||
    query.update == 'partnersHighlight';

  return {
    props: {
      isUpdating: !!query.update && isValidUpdate,
      update: query.update ?? '',
      id: query.id ?? '',
    },
  };
};
