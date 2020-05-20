import styled from 'styled-components';
import Emoji from 'a11y-react-emoji';

export default () => {
  return (
    <Styles>
      <h1 className='main'>CoronaStats</h1>
      <p className='description'>
        A simple web app which shows live statistics and news about COVID-19.
        Created with <Emoji symbol='❤️' label='heart' /> by{' '}
        <span
          onClick={() => window.open('https://twitter.com/raphtlw')}
          className='raphtlw'
        >
          raphtlw
        </span>
      </p>
    </Styles>
  );
};

const Styles = styled.div`
  & {
    margin: ${(props) => props.theme.margin};
  }
  .main {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 2rem;
    color: ${(props) => props.theme.textColor};
    padding-top: 0.2rem;
  }
  .description {
    font-family: 'Roboto Mono', monospace;
    font-weight: 400;
    font-size: 1rem;
    color: ${(props) => props.theme.textColor};
    margin-top: 0.2rem;
  }
  .raphtlw {
    color: ${(props) => props.theme.textColor};
    text-decoration: underline;
  }
  .raphtlw:hover {
    cursor: pointer;
  }
`;
