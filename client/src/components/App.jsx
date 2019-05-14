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

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTopic: ''
    };
  }

  handleChange(e) {
    this.setState({
      searchTopic: e.target.value
    });
  }

  render() {
    return (
      <div className='search'>
        <input
          name='searchTopic'
          value={this.state.searchTopic}
          placeholder='Search Topic Here'
          onChange={this.handleChange.bind(this)}
        ></input>
        <button
          className='btn query-submission'
          onClick={()=>this.props.handleInputSubmission(this.state.searchTopic)}
        >Submit</button>

      </div>

    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      displayedTopic: 'Top Headlines',
    };
    this.getHeadlines = this.getHeadlines.bind(this);
    this.handleInputSubmission = this.handleInputSubmission.bind(this);
  }

  componentDidMount() {
    this.getHeadlines();
  }
  
  getHeadlines() {
    const url = 'https://newsapi.org/v2/top-headlines?' +
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

  handleInputSubmission(topic) {
    const url = 'https://newsapi.org/v2/everything?' +
      `q=${topic}` +
      `&apiKey=${apiKey}` +
      '&sortBy=publishedAt';
    const req = new Request(url);
    fetch(req)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          displayedTopic: topic
        });
      });
  }

  render() {
    return (
      <div>
        <SearchBar
          searchTopic={this.state.searchTopic}
          handleInputSubmission={this.handleInputSubmission}
        />
        <h1>{this.state.displayedTopic}</h1>
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
