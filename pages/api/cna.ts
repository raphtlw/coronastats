import cheerio from 'cheerio';

export default async (req, res) => {
  const body = await fetch(
    'https://www.channelnewsasia.com/news/topics/coronavirus-covid-19'
  ).then((res) => res.text());
  const $ = cheerio.load(body);
  const titleElements = $('.teaser__title');

  const result = [];

  titleElements.each((index, element) => {
    const titleLink = `https://channelnewsasia.com${$(element).attr('href')}`;
    const title = $(element).text();
    result.push({ source: 'CNA', title: title, link: titleLink });
  });

  res.json(result);
};
