const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios').default;
const app = express();

app.get('/', (req, res) => {
  res.json(['Welcome to the CoronaStats API server']);
});

app.get('/beans', (req, res) => {
  res.send('<h1 style="font-family: sans-serif;">beans</h1>');
});

app.get('/corona-stats', (req, res) => {
  (async () => {
    const website = await axios.get(
      'https://www.worldometers.info/coronavirus/'
    );

    const $ = cheerio.load(website.data);
    const mainCounterElements = $('div.maincounter-number span');
    const cases = mainCounterElements[0].children[0].data;
    const deaths = mainCounterElements[1].children[0].data;
    const recovered = mainCounterElements[2].children[0].data;

    console.log(cases);
    console.log(deaths);
    console.log(recovered);

    res.json({
      cases: cases,
      deaths: deaths,
      recovered: recovered
    });
  })();
});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
