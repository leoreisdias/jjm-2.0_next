import Link from 'next/link';

import { Paragraph } from './CopyrightStyle';

export function Copyright() {
  return (
    <Paragraph>
      {'Copyright © '}
      <Link href="https://www.jornaljotamaria.com.br">Jornal JM-</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Paragraph>
  );
}
