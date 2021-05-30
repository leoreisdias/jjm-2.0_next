import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media(max-width: 1080px){
  html{
    font-size: 93.75%;
  }
}
@media(max-width: 720px){
  html{
    font-size: 87.5%;
  }
}

body {
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.white};
}

body, input, textarea, button{
  font: 400 1rem "Montserrat", sans-serif;
}

button{
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

::-webkit-scrollbar {
  width: 10px;
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: ${(props) => props.theme.colors.gray100};
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background:${(props) => props.theme.colors.jjmBlue};
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: ${(props) => props.theme.colors.blue};
}

`;
