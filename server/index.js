const express = require('express');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const cors = require('cors');

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
      const cases = mainCounterElements[0].children[0].data;
      const deaths = mainCounterElements[1].children[0].data;
      const recovered = mainCounterElements[2].children[0].data;
      console.log(`Cases: ${cases}`);
      console.log(`Deaths: ${deaths}`);
      console.log(`Recovered: ${recovered}`);

      // Active cases
      const active = caseStatusMainElements[0].children[0].data;
      const activeMild = caseStatusElements[0].children[0].data;
      const activeSerious = caseStatusElements[1].children[0].data;
      console.log(`Active infected cases: ${active}`);
      console.log(`Active infected cases (mild): ${activeMild}`);
      console.log(`Active infected cases (serious): ${activeSerious}`);

      // Closed cases
      const closed = caseStatusMainElements[1].children[0].data;
      const closedRecovered = caseStatusElements[2].children[0].data;
      const closedDeaths = caseStatusElements[3].children[0].data;
      console.log(`Closed cases: ${closed}`);
      console.log(`Closed cases (recovered): ${closedRecovered}`);
      console.log(`Closed cases (deaths): ${closedDeaths}`);

      return {
        cases: cases,
        deaths: deaths,
        recovered: recovered,
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
    .then(data => {
      res.json(data);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
