import React, { Component } from 'react';

import styles from '../styles.module.css';

export default class NewsWrapper extends Component {
  render() {
    return <div className={styles.newsWrapper}>{this.props.children}</div>;
  }
}
