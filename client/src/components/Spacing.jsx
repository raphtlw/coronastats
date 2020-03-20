import React, { Component } from 'react';

import styles from '../styles.module.css';

export default class Spacing extends Component {
  render() {
    return (
      <div
        className={styles.spacing}
        style={{ height: this.props.height }}
      ></div>
    );
  }
}
