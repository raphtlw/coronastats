import Axios from 'axios';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import './App.module.css';
import Spacing from './Spacing';
import Statistics from './Statistics';
import TitleBar from './TitleBar';
import DetailedStatistics from './DetailedStatistics/DetailedStatistics';

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
    },
    detailsShown: false
  };

  toggleDetails = () => {
    const { detailsShown } = this.state;
    this.setState({ detailsShown: !detailsShown });
  };

  componentDidMount() {
    Axios.get('https://coronastats-backend.herokuapp.com/stats').then(res =>
      this.setState({ stats: res.data })
    );
  }

  render() {
    const { detailsShown } = this.state;
    return (
      <div>
        {/* Mobile */}
        <MediaQuery maxDeviceWidth={1224}>
          <TitleBar />
          <Spacing />
          <Statistics
            name="total confirmed"
            data={this.state.stats.cases}
            color="#FF6262"
          />
          <Spacing />
          <Statistics name="deaths" data={this.state.stats.deaths} />
          <Spacing />
          <Statistics
            name="recovered"
            data={this.state.stats.recovered}
            color="#71FFAE"
          />
          <Spacing />
          <Statistics
            name="active"
            data={this.state.stats.active.total}
            color="#FFD371"
            onClick={this.toggleDetails}
          />
          {detailsShown && (
            <div>
              <Spacing height="1.2rem" />
              <DetailedStatistics
                name="mild"
                data={this.state.stats.active.mild}
                color="#FFD371"
              />
              <Spacing height="1.2rem" />
              <DetailedStatistics
                name="serious"
                data={this.state.stats.active.serious}
                color="#FFD371"
              />
            </div>
          )}
          <Spacing />
          <Statistics
            name="closed"
            data={this.state.stats.closed.total}
            color="#71E5FF"
            onClick={this.toggleDetails}
          />
          {detailsShown && (
            <div>
              <Spacing height="1.2rem" />
              <DetailedStatistics
                name="recovered"
                data={this.state.stats.closed.recovered}
                color="#71E5FF"
              />
              <Spacing height="1.2rem" />
              <DetailedStatistics
                name="deaths"
                data={this.state.stats.closed.deaths}
                color="#71E5FF"
              />
            </div>
          )}
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
