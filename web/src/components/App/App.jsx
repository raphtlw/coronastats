import Axios from 'axios';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import './App.module.css';
import Spacing from './Spacing/Spacing';
import Statistics from './Statistics';
import TitleBar from './TitleBar';
import InstallAppButton from './InstallAppButton/InstallAppButton';

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
        {/* Mobile */}
        <MediaQuery maxDeviceWidth={1224}>
          <TitleBar />
          <Spacing />
          <Statistics
            name="total confirmed"
            data={this.state.stats.cases.toString()}
          />
          <Spacing />
          <Statistics name="deaths" data={this.state.stats.deaths.toString()} />
          <Spacing />
          <Statistics
            name="recovered"
            data={this.state.stats.recovered.toString()}
          />
          <Spacing />
          <Statistics name="active" data={this.state.stats.active.toString()} />
          <Spacing />
          <Statistics name="closed" data={this.state.stats.closed.toString()} />
          <Spacing />
        </MediaQuery>
        {/* Desktop */}
        <MediaQuery minDeviceWidth={1224}>
          <h1 style={{ color: 'white' }}>
            Not supported for desktop yet. Please view on a mobile device :)
          </h1>
        </MediaQuery>
      </div>
    );
  }
}
