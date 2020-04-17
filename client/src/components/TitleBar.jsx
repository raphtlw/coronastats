import React, { Component } from 'react';
import Emoji from 'a11y-react-emoji';

export default class TitleBar extends Component {
  render() {
    return (
      <div className='TitleBar'>
        <h1 className='TitleBar-main'>CoronaStats</h1>
        <p className='TitleBar-description'>
          A simple web app which shows live statistics and news about COVID-19.
          Created with <Emoji symbol='❤️' label='heart' /> by{' '}
          <span
            onClick={() => window.open('https://twitter.com/raphtlw')}
            className='raphtlw'
          >
            raphtlw
          </span>
        </p>
      </div>
    );
  }
}
