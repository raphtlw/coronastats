import React, { Component } from 'react';

import Spacing from './Spacing';

export default class DetailedStatistics extends Component {
  render() {
    return (
      <div>
        <Spacing height='1.2rem' />
        <h1 className='DetailedStatistics-name'>{this.props.name}</h1>
        <h2
          className='DetailedStatistics-data'
          style={{ color: this.props.color }}
        >
          {this.props.data}
        </h2>
      </div>
    );
  }
}
