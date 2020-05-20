import fetch from 'node-fetch';
import cheerio from 'cheerio';

export default (req, res) => {
  fetch('https://www.worldometers.info/coronavirus/')
    .then((res) => res.text())
    .then((body) => {
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
          serious: activeSerious,
        },
        closed: {
          total: closed,
          recovered: closedRecovered,
          deaths: closedDeaths,
        },
      };
    })
    .then((data) => res.json(data));
};
