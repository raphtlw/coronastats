import React, { Component } from 'react';
import Emoji from 'a11y-react-emoji';

export default class App extends Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.props.tapMe && (
          <h3 className='Statistics-tap-me'>
            <Emoji symbol='👈' label='point left' />
            &nbsp;&nbsp;&nbsp;&nbsp;Tap this
          </h3>
        )}
        <h1 className='Statistics-name'>{this.props.name}</h1>
        <h2 className='Statistics-data' style={{ color: this.props.color }}>
          {this.props.data}
        </h2>
      </div>
    );
  }
}
