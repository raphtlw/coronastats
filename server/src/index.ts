import express from 'express';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import cors from 'cors';
import googleNewsAPI = require('google-news-json');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json(['Welcome to the CoronaStats API server']);
});

app.get('/beans', (req, res) => {
  res.send('<h1 style="font-family: sans-serif;">beans</h1>');
});

app.get('/stats', (req, res) => {
  fetch('https://www.worldometers.info/coronavirus/')
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body);

      // Selector helpers
      const mainCounterElements = $('div.maincounter-number span');
      const caseStatusElements = $('span.number-table');
      const caseStatusMainElements = $('div.number-table-main');

      // Overall cases
      const cases: string = mainCounterElements[0].children[0].data.trim();
      const deaths: string = mainCounterElements[1].children[0].data.trim();
      const recovered: string = mainCounterElements[2].children[0].data.trim();
      console.log(`Cases: ${cases}`);
      console.log(`Deaths: ${deaths}`);
      console.log(`Recovered: ${recovered}`);

      // Active cases
      const active: string = caseStatusMainElements[0].children[0].data.trim();
      const activeMild: string = caseStatusElements[0].children[0].data.trim();
      const activeSerious: string = caseStatusElements[1].children[0].data.trim();
      console.log(`Active infected cases: ${active}`);
      console.log(`Active infected cases (mild): ${activeMild}`);
      console.log(`Active infected cases (serious): ${activeSerious}`);

      // Closed cases
      const closed: string = caseStatusMainElements[1].children[0].data.trim();
      const closedRecovered: string = caseStatusElements[2].children[0].data.trim();
      const closedDeaths: string = caseStatusElements[3].children[0].data.trim();
      console.log(`Closed cases: ${closed}`);
      console.log(`Closed cases (recovered): ${closedRecovered}`);
      console.log(`Closed cases (deaths): ${closedDeaths}`);

      return {
        cases,
        deaths,
        recovered,
        active: {
          total: active,
          mild: activeMild,
          serious: activeSerious
        },
        closed: {
          total: closed,
          recovered: closedRecovered,
          deaths: closedDeaths
        }
      };
    })
    .then(data => res.json(data));
});

app.get('/news', async (req, res) => {
  const newsJSON: any = await googleNewsAPI.getNews(
    googleNewsAPI.SEARCH,
    'corona virus'
  );

  const news: JSON[] = newsJSON.items.map(item => {
    return {
      source: 'Google News',
      title: item.title,
      link: item.link
    };
  });

  res.send(news);
});

app.get('/cna', async (req, res) => {
  const body = await fetch(
    'https://www.channelnewsasia.com/news/topics/coronavirus-covid-19'
  ).then(res => res.text());
  const $ = cheerio.load(body);
  const titleElements = $('.teaser__title');

  const result = [];

  titleElements.each((index, element) => {
    const titleLink = `https://channelnewsasia.com${$(element).attr('href')}`;
    const title = $(element).text();
    result.push({ source: 'CNA', title: title, link: titleLink });
  });

  res.json(result);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
