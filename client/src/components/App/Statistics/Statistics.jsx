import React, { Component } from 'react';
import styles from '../App.module.css';

export default class App extends Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <h1 className={styles.name}>{this.props.name}</h1>
        <h2 className={styles.data} style={{ color: this.props.color }}>
          {this.props.data}
        </h2>
      </div>
    );
  }
}
