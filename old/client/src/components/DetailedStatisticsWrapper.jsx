import React, { Component } from 'react';
import { Transition } from 'react-spring/renderprops';

export default class DetailedStatisticsWrapper extends Component {
  render() {
    return (
      <div className='DetailedStatisticsWrapper'>
        <Transition
          items={this.props.shown}
          from={{ opacity: 0, height: 0 }}
          enter={{ opacity: 1, height: 160 }}
          leave={{ opacity: 0, height: 0 }}
        >
          {(show) =>
            show && ((props) => <div style={props}>{this.props.children}</div>)
          }
        </Transition>
      </div>
    );
  }
}
