import React, { Component } from 'react';
import PWAPrompt from 'react-ios-pwa-prompt';
import Axios from 'axios';
import SmoothScrolling from '../lib/smoothScroll';

import '../style.css';
import DetailedStatistics from '../components/DetailedStatistics';
import DetailedStatisticsWrapper from '../components/DetailedStatisticsWrapper';
import News from '../components/News';
import NewsHeader from '../components/NewsHeader';
import NewsWrapper from '../components/NewsWrapper';
import Spacing from '../components/Spacing';
import Statistics from '../components/Statistics';
import TitleBar from '../components/TitleBar';

const SmoothScroll = SmoothScrolling;

export default class App extends Component {
  state = {
    stats: {
      cases: 'loading...',
      deaths: 'loading...',
      recovered: 'loading...',
      active: {
        total: 'loading...',
        mild: 'loading...',
        serious: 'loading...',
      },
      closed: {
        total: 'loading...',
        recovered: 'loading...',
        deaths: 'loading...',
      },
    },
    news: [],
    detailsShown1: false,
    detailsShown2: false,
    tapMe: true,
  };

  componentDidMount = () => {
    this.updateInformation();
    this.interval = setInterval(this.updateInformation, 1 * 60000);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  updateInformation = () => {
    Axios.get('https://coronastats-backend.herokuapp.com/stats').then((res) =>
      this.setState({ stats: res.data })
    );
    Axios.get('https://coronastats-backend.herokuapp.com/news').then((res) =>
      this.setState({ news: res.data })
    );
  };

  toggleDetails1 = () => {
    const { detailsShown1 } = this.state;
    this.setState({ detailsShown1: !detailsShown1, tapMe: false });
  };

  toggleDetails2 = () => {
    const { detailsShown2 } = this.state;
    this.setState({ detailsShown2: !detailsShown2, tapMe: false });
  };

  render() {
    return (
      <div>
        {/* Install Prompt */}
        <PWAPrompt permanentlyHideOnDismiss={false} />
        <TitleBar />
        <Spacing height='1.2rem' />
        <div className='App-statistics'>
          <Statistics
            name='total confirmed'
            data={this.state.stats.cases}
            color='#71FFAE'
          />
          <Spacing />
          <Statistics name='deaths' data={this.state.stats.deaths} />
          <Spacing />
          <Statistics
            name='recovered'
            data={this.state.stats.recovered}
            color='#FF6262'
          />
          <Spacing />
          <Statistics
            name='active'
            data={this.state.stats.active.total}
            color='#FFD371'
            onClick={this.toggleDetails1}
            tapMe={this.state.tapMe}
          />
          <DetailedStatisticsWrapper shown={this.state.detailsShown1}>
            <DetailedStatistics
              name='mild'
              data={this.state.stats.active.mild}
              color='#FFD371'
            />
            <DetailedStatistics
              name='serious'
              data={this.state.stats.active.serious}
              color='#FFD371'
            />
          </DetailedStatisticsWrapper>
          <Spacing />
          <Statistics
            name='closed'
            data={this.state.stats.closed.total}
            color='#71E5FF'
            onClick={this.toggleDetails2}
            tapMe={this.state.tapMe}
          />
          <DetailedStatisticsWrapper shown={this.state.detailsShown2}>
            <DetailedStatistics
              name='recovered'
              data={this.state.stats.closed.recovered}
              color='#71E5FF'
            />
            <DetailedStatistics
              name='deaths'
              data={this.state.stats.closed.deaths}
              color='#71E5FF'
            />
          </DetailedStatisticsWrapper>
        </div>
        <div id='scrollTo'>
          <Spacing />
        </div>
        <div>
          <NewsHeader onClick={() => SmoothScroll.scrollTo('scrollTo')} />
          <NewsWrapper>
            {this.state.news.map((item, index) => (
              <News
                key={index}
                source={item.source}
                onClick={() => setTimeout(() => window.open(item.link), 100)}
              >
                {item.title}
              </News>
            ))}
            <Spacing height='0.8rem' />
          </NewsWrapper>
        </div>
      </div>
    );
  }
}
