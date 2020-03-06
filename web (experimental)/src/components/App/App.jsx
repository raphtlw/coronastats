import Axios from 'axios';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import './App.css';
import Spacing from './Spacing/Spacing';
import Statistics from './Statistics';
import TitleBar from './TitleBar';

export default class App extends Component {
  state = {
    stats: {
      cases: '',
      deaths: '',
      recovered: '',
      active: {
        total: '',
        mild: '',
        serious: ''
      },
      closed: {
        total: '',
        recovered: '',
        deaths: ''
      }
    }
  };

  componentDidMount() {
    Axios.get('https://coronastats-backend.herokuapp.com/stats').then(res =>
      this.setState({ stats: res.data })
    );
  }

  render() {
    return (
      <div>
        <MediaQuery minDeviceWidth={1224}>
          <h1>Desktop</h1>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <div className="statistics">
            <Statistics
              name="total confirmed"
              data={this.state.stats.cases.toString()}
              color="#ff6262"
            />
            <Spacing />
            <Statistics
              name="total deaths"
              data={this.state.stats.deaths.toString()}
            />
            <Spacing />
            <Statistics
              name="total recovered"
              data={this.state.stats.recovered.toString()}
              color="#71ffae"
            />
            <Spacing />
            <Statistics
              name="active"
              data={this.state.stats.active.toString()}
              color="#ffd371"
            />
            <Spacing />
            <Statistics
              name="closed"
              data={this.state.stats.closed.toString()}
              color="#71e5ff"
            />
            <Spacing />
          </div>
        </MediaQuery>
        <TitleBar />
      </div>
    );
  }
}
