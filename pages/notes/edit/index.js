import React from 'react';
import NoteLayout from '../../../components/NoteLayout';
import s from './styles.css';
import {filter} from 'lodash';
import 'whatwg-fetch';
import Spinner from 'react-mdl/lib/Spinner';
import EditorSection from "../../../components/EditorSection";
const GitHubApi = require("github-api");
import {Link} from "react-router";

const MarkdownIt = require('markdown-it');

class NoteEditPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataReady: false,
    };
    this._editor = "";
    this.contentSubmit = this.contentSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
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
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          var md = new MarkdownIt({html: true, linkify: true});
          var renderedHTML = md.render(data);
          self.setState({
            article: renderedHTML,
            isDataReady: true
          });
        })
    } else {
      console.log("-----------------------");
      console.log("Back to Home and Refresh");
    }
  }


  _onChange(state){
    this._editor = state;
  }

  contentSubmit() {
    var path = this.basicArticleInfo.path;
    const token = localStorage.getItem('settings.token');
    var github = new GitHubApi({
      token: token,
      auth: "oauth"
    });
    var repo = github.getRepo('phodal', 'mole-test');

    repo.writeFile('gh-pages', path, this._editor, 'Robot: test for add article', function (err, data) {
      if(data.commit){
        console.log("--------------")
      }
    });
  }

  render() {
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
            <div className="markdown">
              <EditorSection
                onChange={this._onChange}
                content={this.state.article}
                ref={(c) => this._editor = c}
              />
            </div>
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
