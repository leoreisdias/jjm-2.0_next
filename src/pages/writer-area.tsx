import { useState } from 'react';

import Head from 'next/head';
import Select from 'react-select';

import { NewsForm } from '../components/Forms/NewsForm';
import { useAuth } from '../hooks/useAuth';
import { WriterSection } from '../styles/pages/WriterArea';

export default function WriterArea() {
  const { username } = useAuth();

  const [formType, setFormType] = useState<string>('news');

  const options = [
    { value: 'news', label: 'Cadastrar Notícia' },
    { value: 'deathReport', label: 'Cadastrar Nota de Falecimento' },
    { value: 'partners', label: 'Cadastrar novo Patrocínip' },
    { value: 'partnersHighlight', label: 'Cadastrar Destaque de Patrocínio' },
  ];

  return (
    <WriterSection>
      <Head>
        <title>Area do Redator | JJM</title>
      </Head>
      <h3>Bem vindo {username}</h3>
      <Select
        id="optionSelect"
        instanceId="options"
        className="basic-single"
        classNamePrefix="select"
        defaultValue={options[0]}
        options={options}
        onChange={(e) => setFormType(e.value)}
      />
      {formType == 'news' && <NewsForm />}
    </WriterSection>
  );
}
