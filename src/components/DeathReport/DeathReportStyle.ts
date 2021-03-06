import { Card, DialogContent } from '@material-ui/core';
import { lighten } from 'polished';
import styled from 'styled-components';

export const AdImage = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 200px;
  }
`;

export const CardAd = styled(Card)`
  max-width: 345px;
  margin: 30px auto;

  background: ${(props) => lighten(0.75, props.theme.colors.background)};

  h3 {
    font-family: 'Nunito';
    margin-bottom: 1rem;
    font-size: 1.15rem;
  }
  p {
    text-align: center;
    font-size: 1.1rem;
    font-family: 'Nunito';
    font-weight: 600;
    color: ${(props) => props.theme.colors.gray800};
  }
`;

export const CustomDialogContent = styled(DialogContent)`
  background: ${(props) => lighten(0.75, props.theme.colors.background)};
`;

export const DetailReportModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    margin-bottom: 0.5rem;
    text-align: center;
  }

  img {
    border-radius: 40px;
  }

  strong {
    display: block;
    margin-top: 0.4rem;
    font-size: 1.2rem;
  }
  span {
    margin: 0.5rem 0;
    border: 1px dashed ${(props) => props.theme.colors.gray800};
    border-radius: 5px;
    padding: 0 1rem;
  }

  p {
    max-width: 90%;
    line-height: 1.6rem;
    text-align: center;
    white-space: pre-wrap;
    padding-bottom: 0.4rem;
  }

  span {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.25rem 0;
    }
  }

  .icon {
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      scale: 1.05;
    }
  }
`;
