import React from 'react';
import Layout from '../../../components/Layout';
import s from './styles.css';
import {filter} from 'lodash';
import 'whatwg-fetch';
const MarkdownIt = require('markdown-it');
import Spinner from 'react-mdl/lib/Spinner';

class NoteViewPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataReady: false
    }
  }

  componentDidMount() {
    document.title = 'View - Note';

    var id = this.props.routeParams.id;
    var content = localStorage.getItem("content");
    var baseUrl = localStorage.getItem("base_url");
    var self = this;

    if (content) {
      var articles = JSON.parse(content);
      var basicArticleInfo = filter(articles, {id: id})[0];
      var articleUrl = baseUrl + basicArticleInfo.path;
      fetch(articleUrl)
        .then(function(response) {
          return response.text();
        })
        .then(function(data) {
          self.setState({
            article: data,
            isDataReady: true
          });
        })
    } else {
      console.log("-----------------------");
      console.log("Back to Home and Refresh");
    }
  }

  renderMarkdown(content) {
    const md = new MarkdownIt({html: true, linkify: true});
    return {
      __html: md.render(content)
    };
  }

  render() {
    if (this.state.article) {
      return (
        <Layout className={s.content}>
          <div className="markdown" dangerouslySetInnerHTML={this.renderMarkdown(this.state.article)}></div>
        </Layout>
      );
    } else {
      return (
        <Layout className={s.content}>
          <Spinner />
        </Layout>
      )
    }
  }

}

export default NoteViewPage;
