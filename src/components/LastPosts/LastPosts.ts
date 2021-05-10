import styled from 'styled-components';

export const LastPostsContainer = styled.li`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;

  padding: 1rem 0rem;

  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray200};

  list-style: none;

  img {
    border-radius: 50%;
  }

  p {
    max-width: 500px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p span {
    display: block;
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-bottom: 0.4rem;
  }

  p strong {
    font-size: 1.005rem;
  }
`;
