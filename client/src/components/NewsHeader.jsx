import React, { Component } from 'react';

import styles from '../styles.module.css';

export default class NewsHeader extends Component {
  render() {
    return (
      <div className={styles.newsHeader}>
        <h1>News</h1>
      </div>
    );
  }
}
