import React, { Component } from 'react';
import styles from '../App.module.css';

export default class DetailedStatistics extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.detailsName}>{this.props.name}</h1>
        <h2 className={styles.detailsData} style={{ color: this.props.color }}>
          {this.props.data}
        </h2>
      </div>
    );
  }
}
