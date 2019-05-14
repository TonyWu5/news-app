import React from 'react';
import apiInfo from '../../../.apiKey.js';

const { apiKey } = apiInfo;

const Author = (props) => {
  const author = props.author;
  if (author) {
    return (
      <span className='author'>By {author}, &nbsp;&nbsp;</span>
    );
  } else {
    return (
      <span className='author'>Unknown Author, &nbsp;&nbsp;</span>
    );
  }
};

const Article = (props) => {
  const { author, title, description, url, urlToImage, content, publishedAt } = props.article;
  return (
    <div>
      <a href={url}>
        <h3 className='title'>{title}</h3>
      </a>
      <Author author={author} />
      <span className='publishedAt'>Published {publishedAt}</span>
      <p className='content'>{content}</p>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
    this.getHeadlines = this.getHeadlines.bind(this);
  }

  componentDidMount() {
    this.getHeadlines();
  }

  getHeadlines() {
    var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    `apiKey=${apiKey}`;
    const req = new Request(url);
    fetch(req)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({articles: data.articles});
      });
  }

  render() {
    return (
      <div>
        <h1>Top Headlines</h1>
        <div>
          {this.state.articles.map((article) => {
            return (
              <Article article={article} key={article.url} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;