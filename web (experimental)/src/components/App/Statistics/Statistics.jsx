import React, { Component } from 'react';
import './Statistics.css';

export default class App extends Component {
  render() {
    return (
      <div className="main-div">
        <h1 className="header">{this.props.name}</h1>
        <div className="center-data">
          <h2 className="data" style={{ color: this.props.color }}>
            {this.props.data}
          </h2>
        </div>
      </div>
    );
  }
}
