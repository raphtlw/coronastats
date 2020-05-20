import React, { Component } from 'react';

export default class NewsWrapper extends Component {
  render() {
    return <div className='NewsWrapper'>{this.props.children}</div>;
  }
}
