import React, { Component } from 'react';

export default class Spacing extends Component {
  render() {
    return (
      <div className='Spacing' style={{ height: this.props.height }}></div>
    );
  }
}
