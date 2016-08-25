import React from 'react';
import Layout from '../../../components/Layout';
import s from './styles.css';
import {filter} from 'lodash';
import 'whatwg-fetch';
const MarkdownIt = require('markdown-it');

class NoteEditPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataReady: false
    }
  }

  componentWillMount() {
    var pattern = new RegExp(this.props.route.pattern);
    var result = pattern.exec(window.location.pathname);
    var id = result[1];
    var content = localStorage.getItem("content");
    var baseUrl = localStorage.getItem("base_url");
    var self = this;

    if (content) {
      var articles = JSON.parse(content);
      var basicArticleInfo = filter(articles, {id: id})[0];
      var articleUrl = baseUrl + basicArticleInfo.path;
      fetch(articleUrl)
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          self.setState({
            article: data,
            isDataReady: true
          })
        });
    } else {
      console.log("-----------------------");
      console.log("Back to Home and Refresh");
    }
  }

  renderMarkdown(content) {
    console.log(content);

    // const md = new MarkdownIt({html: true, linkify: true});
    // return {
    //   __html: md.render(content)
    // }
    return {
      __html: "<span>test</span>"
    }
  }

  componentDidMount() {
    document.title = 'Edit - Note';
  }

  render() {

    return (
      <Layout className={s.content}>
        {
          this.state.isDataReady && <div dangerouslySetInnerHTML={this.renderMarkdown(this.state.articles)}></div>
        }
      </Layout>
    );
  }

}

export default NoteEditPage;
