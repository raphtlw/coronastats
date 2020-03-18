import React, { Component } from 'react';
import styles from '../App.module.css';

export default class App extends Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <h3
          style={{ visibility: this.props.tapMe ? 'visible' : 'hidden' }}
          className={styles.tapMe}
        >
          👈&nbsp;&nbsp;&nbsp;&nbsp;Tap this
        </h3>
        <h1 className={styles.name}>{this.props.name}</h1>
        <h2 className={styles.data} style={{ color: this.props.color }}>
          {this.props.data}
        </h2>
      </div>
    );
  }
}
