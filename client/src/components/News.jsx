import React, { Component } from 'react';

import styles from '../styles.module.css';

export default class News extends Component {
  render() {
    return (
      <div onClick={this.props.onClick} className={styles.news}>
        <h1 className={styles.newsSource}>{this.props.source}</h1>
        <h2 className={styles.newsTitle}>{this.props.children}</h2>
      </div>
    );
  }
}
