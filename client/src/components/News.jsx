import React, { Component } from 'react';
import Ripples from 'react-ripples';

import styles from '../styles.module.css';
import { Spacing } from '.';

export default class News extends Component {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <Spacing height='1rem' />
        <Ripples
          className={styles.newsRipples}
          during={600}
          color='rgba(0, 0, 0, 0.3)'
        >
          <div className={styles.news} onClick={this.props.onClick}>
            <h1 className={styles.newsSource}>{this.props.source}</h1>
            <h2 className={styles.newsTitle}>{this.props.children}</h2>
          </div>
        </Ripples>
      </div>
    );
  }
}
