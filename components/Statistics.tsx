import styled from 'styled-components';
import Emoji from 'a11y-react-emoji';

export default (props) => {
  return (
    <Styles color={props.color} onClick={props.onClick}>
      {props.tapMe && (
        <h3 className='tap-me'>
          <Emoji symbol='👈' label='point left' />
          &nbsp;&nbsp;&nbsp;&nbsp;Tap this
        </h3>
      )}
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
    font-size: 1.2rem;
    text-transform: uppercase;
  }
  .data {
    font-weight: 400;
    font-size: 2.2rem;
    color: ${(props) => props.color};
  }
  .tap-me {
    float: right;
    margin-top: 1.4rem;
    margin-right: 3.2rem;
    color: ${(props) => props.theme.textColor};
    font-weight: 400;
    font-size: 1rem;
  }
`;
