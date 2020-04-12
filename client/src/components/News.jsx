import React, { Component } from 'react';
import Ripples from 'react-ripples';

import Spacing from './Spacing';

export default class News extends Component {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <Spacing height='1rem' />
        <Ripples
          className='News-ripples'
          during={600}
          color='rgba(0, 0, 0, 0.3)'
        >
          <div className='News' onClick={this.props.onClick}>
            <h1 className='News-source'>{this.props.source}</h1>
            <h2 className='News-title'>{this.props.children}</h2>
          </div>
        </Ripples>
      </div>
    );
  }
}
