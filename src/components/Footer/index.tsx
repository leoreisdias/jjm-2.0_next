import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

import { useJJM } from '../../hooks/useJJM';
import { PartnersProps } from '../../types/interfaces/Partners';
import { Copyright } from '../Copyright';
import { FooterContainer, AboutJJM, ParternsTags, DevelopedBy } from './FooterStyle';

export default function Footer() {
  const { data: partners } = useJJM<PartnersProps[]>('/partners');

  return (
    <FooterContainer>
      <AboutJJM>
        <h2>Jornal JM</h2>
        <p>
          Projeto feito pelo interesse em passar informação aos cidadãos do município!
          Originalmente com Lives no Perfil particular trazendo entrevistas, brincadeiras
          e notícias. Muitas pessoas gostaram! E por isso o JJM surgiu como um projeto em
          busca de se tornar uma referência de notícias e com alguns entretenimentos aos
          cidadãos de Muzambinho e região!
        </p>
        <a
          href="https://www.facebook.com/jornaljotamaria"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebook size={20} color="white" />
        </a>
        <Copyright />
      </AboutJJM>

      <ParternsTags>
        <h3>Parceiros</h3>
        <ul>
          {partners ? (
            partners.map((item) => {
              return <li key={item._id}>{item.name}</li>;
            })
          ) : (
            <li>Seja um Patrocinador como os que aparecerão aqui já já</li>
          )}
        </ul>
      </ParternsTags>
      <DevelopedBy>
        <span>
          <a href="https://github.com/leoreisdias" target="_blank" rel="noreferrer">
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/leonardord99/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={20} />
          </a>
        </span>
        Desenvolvido por Leonardo R Dias
      </DevelopedBy>
    </FooterContainer>
  );
}
