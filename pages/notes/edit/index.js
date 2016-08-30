import React from 'react';
import NoteLayout from '../../../components/NoteLayout';
import s from './styles.css';
import {filter} from 'lodash';
import 'whatwg-fetch';
import Spinner from 'react-mdl/lib/Spinner';
import EditorSection from "../../../components/EditorSection";
import {Link} from "react-router";
import {isObject} from 'lodash';

var GitHubApi = require("github-api");
var toMarkdown = require('to-markdown');
var MarkdownIt = require('markdown-it');
var jsdiff = require('diff');
var MarkdownEditor = require('react-md-editor');

class NoteEditPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataReady: false,
    };
    this._editor = "";
    this.originContent = "";
    this.contentSubmit = this.contentSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.editorType = localStorage.getItem('settings.editor');
  }

  componentDidMount() {
    document.title = 'Edit - Note';

    var id = this.props.routeParams.id;
    var content = localStorage.getItem("content");
    var baseUrl = localStorage.getItem("base_url");
    var self = this;

    if (content) {
      var articles = JSON.parse(content);
      self.basicArticleInfo = filter(articles, {id: id})[0];
      var articleUrl = baseUrl + self.basicArticleInfo.path;
      fetch(articleUrl)
        .then(function(response) {
          return response.text();
        })
        .then(function(data) {
          self.originContent = data;
          var md = new MarkdownIt({html: true, linkify: true});
          var renderedHTML = md.render(data);
          self.setState({
            article: renderedHTML,
            markdown: data,
            isDataReady: true
          });
        })
    } else {
      console.log("-----------------------");
      console.log("Back to Home and Refresh");
    }
  }

  _onChange(state) {
    this._editor = state;
  }

  updateArticle(state) {
    this.setState({
      markdown: state
    })
  }

  contentSubmit() {
    var content;
    if (this.editorType === 'rich') {
      var hasEnterContent = isObject(this._editor);
      if (hasEnterContent) {
        return;
      }

      content = toMarkdown(this._editor).toString();
      var diff = jsdiff.diffSentences(this.originContent, content);

      var hasDiff = diff && diff.length > 0 && !(diff[0].count >= 1);
      if (hasDiff) {
        return;
      }
      this.doCommit(content);
    } else {
      content = this.state.markdown;
      this.doCommit(content);
    }
  }

  doCommit(content) {
    const token = localStorage.getItem('settings.token');
    const username = localStorage.getItem('settings.username');
    const email = localStorage.getItem('settings.email');

    var path = this.basicArticleInfo.path;
    var github = new GitHubApi({
      token: token,
      auth: "oauth"
    });
    var repo = github.getRepo('phodal', 'mole-test');

    var options = {
      committer: {
        name: username,
        email: email
      },
    };

    repo.writeFile('gh-pages', path, content, 'Robot: test for add article', options, function(err, data) {
      if (data.commit) {
        console.log("commit successful");
      }
      if (err) {
        console.log(err);
      }
    });
  }

  render() {
    var editor;
    if (this.editorType === 'rich') {
      editor =
        <div className="markdown">
          <EditorSection
            onChange={this._onChange}
            content={this.state.article}
            ref={(c) => this._editor = c}
          />
        </div>;
    } else {
      editor = <MarkdownEditor value={this.state.markdown} onChange={this.updateArticle}/>;
    }

    if (this.state.article) {
      return (
        <div className="mdl-layout mdl-js-layout content">
          <div className="mdl-layout__inner-container">
            <header className={`mdl-layout__header ${s.header}`}>
              <div className={`mdl-layout__header-row ${s.row}`}>
                <Link className={`mdl-layout-title ${s.title}`} to="/" onClick={this.contentSubmit}>
                  <span><i className="fa fa-chevron-left"></i>返回</span>
                </Link>
                <div className="mdl-layout-spacer"></div>
              </div>
            </header>
            <main className="mdl-layout__content">
              {editor}
            </main>
          </div>
        </div>
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

export default NoteEditPage;
