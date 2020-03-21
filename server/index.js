"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cheerio_1 = __importDefault(require("cheerio"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.get('/', (req, res) => {
    res.json(['Welcome to the CoronaStats API server']);
});
app.get('/beans', (req, res) => {
    res.send('<h1 style="font-family: sans-serif;">beans</h1>');
});
app.get('/stats', (req, res) => {
    node_fetch_1.default('https://www.worldometers.info/coronavirus/')
        .then(res => res.text())
        .then(body => {
        const $ = cheerio_1.default.load(body);
        const mainCounterElements = $('div.maincounter-number span');
        const caseStatusElements = $('span.number-table');
        const caseStatusMainElements = $('div.number-table-main');
        const cases = mainCounterElements[0].children[0].data.trim();
        const deaths = mainCounterElements[1].children[0].data.trim();
        const recovered = mainCounterElements[2].children[0].data.trim();
        console.log(`Cases: ${cases}`);
        console.log(`Deaths: ${deaths}`);
        console.log(`Recovered: ${recovered}`);
        const active = caseStatusMainElements[0].children[0].data.trim();
        const activeMild = caseStatusElements[0].children[0].data.trim();
        const activeSerious = caseStatusElements[1].children[0].data.trim();
        console.log(`Active infected cases: ${active}`);
        console.log(`Active infected cases (mild): ${activeMild}`);
        console.log(`Active infected cases (serious): ${activeSerious}`);
        const closed = caseStatusMainElements[1].children[0].data.trim();
        const closedRecovered = caseStatusElements[2].children[0].data.trim();
        const closedDeaths = caseStatusElements[3].children[0].data.trim();
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
app.get('/news', (req, res) => {
    node_fetch_1.default('https://www.channelnewsasia.com/news/topics/coronavirus-covid-19')
        .then(res => res.text())
        .then(body => {
        const $ = cheerio_1.default.load(body);
        const titleElements = $('.teaser__title');
        const result = [];
        titleElements.each((index, element) => {
            const titleLink = `https://channelnewsasia.com${$(element).attr('href')}`;
            const title = $(element).text();
            result.push({ source: 'CNA', title: title, link: titleLink });
        });
        return result;
    })
        .then(data => res.json(data));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
