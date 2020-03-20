import React, { Component } from 'react';

import styles from '../styles.module.css';
import { Spacing } from '.';

export default class DetailedStatistics extends Component {
  render() {
    return (
      <div>
        <Spacing height='1.2rem' />
        <h1 className={styles.detailsName}>{this.props.name}</h1>
        <h2 className={styles.detailsData} style={{ color: this.props.color }}>
          {this.props.data}
        </h2>
      </div>
    );
  }
}
