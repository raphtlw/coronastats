import styled from 'styled-components';

import Spacing from './Spacing';

export default (props) => {
  return (
    <Styles color={props.color}>
      <Spacing height='1.2rem' />
      <h1 className='name'>{props.name}</h1>
      <h2 className='data'>{props.data}</h2>
    </Styles>
  );
};

const Styles = styled.div`
  .name,
  .data {
    font-family: 'Roboto Mono', monospace;
    color: ${(props) => props.theme.textColor};
  }
  .name {
    font-weight: 500;
    font-size: 1rem;
    text-transform: uppercase;
  }
  .data {
    font-weight: 400;
    font-size: 2rem;
    color: ${(props) => props.color};
  }
`;
