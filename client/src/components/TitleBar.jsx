import React, { Component } from 'react';

import styles from '../styles.module.css';

export default class TitleBar extends Component {
  render() {
    return (
      <div className={styles.titleBar}>
        <h1 className={styles.mainTitle}>CoronaStats</h1>
        <p className={styles.mainDescription}>
          A simple web app which shows live statistics and news about COVID-19.
        </p>
      </div>
    );
  }
}
