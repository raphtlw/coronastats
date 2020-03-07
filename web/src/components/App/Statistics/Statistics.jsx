import React, { Component } from 'react';
import styles from '../App.module.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.name}>{this.props.name}</h1>
        <h2 className={styles.data}>{this.props.data}</h2>
      </div>
    );
  }
}
