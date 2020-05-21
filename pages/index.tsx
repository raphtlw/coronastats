import { useState, useEffect } from 'react';
import styled from 'styled-components';
import fetch from 'node-fetch';
import FadeIn from 'react-fade-in';
import { useSpring } from 'react-spring';
import { v4 as uuid } from 'uuid';

import TitleBar from '../components/TitleBar';
import Spacing from '../components/Spacing';
import Statistics from '../components/Statistics';
import DetailedStatistics from '../components/DetailedStatistics';
import DetailedStatisticsWrapper from '../components/DetailedStatisticsWrapper';
import NewsHeader from '../components/NewsHeader';
import NewsWrapper from '../components/NewsWrapper';
import News from '../components/News';

export default () => {
  const [stats, setStats] = useState({
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
  });
  const [news, setNews] = useState([]);
  const [detailsShown1, setDetailsShown1] = useState(false);
  const [detailsShown2, setDetailsShown2] = useState(false);
  const [tapMe, setTapMe] = useState(true);

  const updateInformation = () => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((res) => setStats(res));
    fetch('/api/news')
      .then((res) => res.json())
      .then((res) => setNews(res));
  };

  useEffect(() => {
    updateInformation();
    const interval = setInterval(updateInformation, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [, setY] = useSpring(() => ({ y: 0 }));

  return (
    <Styles>
      <FadeIn>
        <TitleBar />
        <Spacing height='1.2rem' />
        <div className='statistics'>
          <FadeIn>
            <Statistics name='total confirmed' data={stats.cases} />
            <Spacing />
            <Statistics name='deaths' data={stats.deaths} color='#FF6262' />
            <Spacing />
            <Statistics
              name='recovered'
              data={stats.recovered}
              color='#71FFAE'
            />
            <Spacing />
            <Statistics
              name='active'
              data={stats.active.total}
              color='#FFD371'
              onClick={() => {
                setDetailsShown1(!detailsShown1);
                setTapMe(false);
              }}
              tapMe={tapMe}
            />
            <DetailedStatisticsWrapper shown={detailsShown1}>
              <DetailedStatistics
                name='mild'
                data={stats.active.mild}
                color='#FFD371'
              />
              <DetailedStatistics
                name='serious'
                data={stats.active.serious}
                color='#FFD371'
              />
            </DetailedStatisticsWrapper>
            <Spacing />
            <Statistics
              name='closed'
              data={stats.closed.total}
              color='#71E5FF'
              onClick={() => {
                setDetailsShown2(!detailsShown2);
                setTapMe(false);
              }}
              tapMe={tapMe}
            />
            <DetailedStatisticsWrapper shown={detailsShown2}>
              <DetailedStatistics
                name='recovered'
                data={stats.closed.recovered}
                color='#71E5FF'
              />
              <DetailedStatistics
                name='deaths'
                data={stats.closed.deaths}
                color='#71E5FF'
              />
            </DetailedStatisticsWrapper>
          </FadeIn>
        </div>
        <Spacing />
        <div>
          <NewsHeader
            onClick={() => {
              setY({
                y: 700,
                reset: true,
                from: { y: window.scrollY },
                // @ts-ignore
                onFrame: (props) => window.scroll(0, props.y),
              });
            }}
          />
          <NewsWrapper>
            {news.map((item) => (
              <News
                key={uuid()}
                source={item.source}
                onClick={() => window.open(item.link)}
              >
                {item.title}
              </News>
            ))}
            <Spacing height='0.8rem' />
          </NewsWrapper>
        </div>
      </FadeIn>
    </Styles>
  );
};

const Styles = styled.div`
  .statistics {
    margin: ${(props) => props.theme.margin};
  }
`;
