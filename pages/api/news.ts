import googleNewsAPI from 'google-news-json';

export default async (req, res) => {
  const news_1: any = await googleNewsAPI.getNews(
    googleNewsAPI.SEARCH,
    'corona virus'
  );

  const news_2: any = await googleNewsAPI.getNews(
    googleNewsAPI.SEARCH,
    'pandemic'
  );

  const totalNews = news_1.items.concat(news_2.items);

  shuffleArray(totalNews);

  const news: any[] = totalNews.map((item) => {
    return {
      source: 'Google News',
      title: item.title,
      link: item.link,
    };
  });

  res.send(news);
};

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
