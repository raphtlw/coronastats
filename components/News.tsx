import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import {
  LazyLoadComponent,
  trackWindowScroll,
} from 'react-lazy-load-image-component';

import Spacing from './Spacing';

const Styles = styled.div`
  .main {
    background-color: rgb(245, 245, 245);
    border-radius: 8px;
    padding: 1.2rem 1.2rem;
    color: rgb(10, 10, 10);
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.089);
    width: 100%;
    cursor: pointer;
    transition: all ease-in-out 0.05s;
  }
  .main:active {
    transform: scale(0.99);
    box-shadow: 0px 0px 0px transparent;
  }
  .source {
    text-transform: uppercase;
    font-size: 0.7rem;
    color: rgb(90, 90, 90);
    letter-spacing: 1.8px;
    font-weight: 700;
  }
  .title {
    margin-top: 0.4rem;
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

const News = (props) => {
  return (
    <Styles>
      <LazyLoadComponent scrollPosition={props.scrollPosition}>
        <FadeIn>
          <Spacing height='1rem' />
          <div className='main' onClick={props.onClick}>
            <h1 className='source'>{props.source}</h1>
            <h2 className='title'>{props.children}</h2>
          </div>
        </FadeIn>
      </LazyLoadComponent>
    </Styles>
  );
};

export default trackWindowScroll(News);
