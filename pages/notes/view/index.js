import React from "react";
import NoteLayout from "../../../components/NoteLayout";
import s from "./styles.css";
import {filter} from "lodash";
import "whatwg-fetch";
import Spinner from "react-mdl/lib/Spinner";
const MarkdownIt = require('markdown-it');

class NoteViewPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataReady: false
    };
    const note = localStorage.getItem("note." + this.props.routeParams.id);
    if (note) {
      this.state.article = note;
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
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          localStorage.setItem("note." + id, data);

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
        <NoteLayout className={s.content}>
          <div className="markdown" dangerouslySetInnerHTML={this.renderMarkdown(this.state.article)}></div>
        </NoteLayout>
      );
    } else {
      return (
        <NoteLayout className={s.content}>
          <Spinner />
        </NoteLayout>
      )
    }
  }

}

export default NoteViewPage;
