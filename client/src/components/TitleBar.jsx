import React, { Component } from 'react';

import styles from '../styles.module.css';

export default class TitleBar extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.mainTitle}>CoronaStats</h1>
        <p className={styles.mainDescription}>
          A simple web app showing the statistics of COVID-19.
        </p>
      </div>
    );
  }
}
