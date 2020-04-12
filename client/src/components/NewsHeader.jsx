import React, { Component } from 'react';

export default class NewsHeader extends Component {
  render() {
    return (
      <div onClick={this.props.onClick} className='NewsHeader'>
        <h1>News</h1>
      </div>
    );
  }
}
