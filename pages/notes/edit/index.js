import React, { PropTypes } from 'react';
import NoteLayout from '../../../components/NoteLayout';
import s from './styles.css';
import { filter, isObject } from 'lodash';
import 'whatwg-fetch';
import Spinner from 'react-mdl/lib/Spinner';
import EditorSection from '../../../components/EditorSection';
import { Link } from 'react-router';
const GitHubApi = require('github-api');
const toMarkdown = require('to-markdown');
const MarkdownIt = require('markdown-it');
const jsdiff = require('diff');
const MarkdownEditor = require('react-md-editor');

class NoteEditPage extends React.Component {
  static propTypes = {
    routeParams: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDataReady: false,
    };

    this.editorContent = '';
    this.originContent = '';
    this.contentSubmit = this.contentSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.editorType = localStorage.getItem('settings.editor');
  }

  componentDidMount() {
    document.title = 'Edit - Note';

    const id = this.props.routeParams.id;
    const content = localStorage.getItem('content');
    const baseUrl = localStorage.getItem('base_url');
    const self = this;

    if (content) {
      const articles = JSON.parse(content);
      self.basicArticleInfo = filter(articles, { id })[0];
      const articleUrl = baseUrl + self.basicArticleInfo.path;
      fetch(articleUrl)
        .then(response => response.text())
        .then(data => {
          self.originContent = data;
          const md = new MarkdownIt({ html: true, linkify: true });
          const renderedHTML = md.render(data);
          self.setState({
            article: renderedHTML,
            markdown: data,
            isDataReady: true,
          });
        });
    }
  }

  onChange(state) {
    this.editorContent = state;
  }

  updateArticle(state) {
    this.setState({
      markdown: state,
    });
  }

  contentSubmit() {
    let content;
    let diff;
    let hasDiff;

    if (this.editorType === 'rich') {
      const hasEnterContent = isObject(this.editorContent);
      if (hasEnterContent) {
        return;
      }

      content = toMarkdown(this.editorContent).toString();
      diff = jsdiff.diffSentences(this.originContent, content);
      hasDiff = diff && diff.length > 1;
    } else {
      content = this.state.markdown;
      diff = jsdiff.diffSentences(this.originContent, content);
      hasDiff = diff && diff.length > 1;
    }

    if (!hasDiff) {
      return;
    }

    this.doCommit(content);
  }

  doCommit(content) {
    const token = localStorage.getItem('settings.token');
    const username = localStorage.getItem('settings.username');
    const email = localStorage.getItem('settings.email');

    const path = this.basicArticleInfo.path;
    const github = new GitHubApi({
      token,
      auth: 'oauth',
    });
    const repo = github.getRepo('phodal', 'mole-test');

    const options = {
      committer: {
        name: username,
        email,
      },
    };

    const message = 'Robot: test for add article';
    repo.writeFile('gh-pages', path, content, message, options, (err, data) => {
      if (data.commit) {
        console.log('commit successful');
      }
      if (err) {
        alert(err);
      }
    });
  }

  render() {
    let editor;
    if (this.editorType === 'rich') {
      editor = (
        <div className="markdown">
          <EditorSection
            onChange={this.onChange}
            content={this.state.article}
            ref={(c) => { this.editorContent = c; }}
          />
        </div>);
    } else {
      editor = (<MarkdownEditor value={this.state.markdown} onChange={this.updateArticle} />);
    }

    if (this.state.article) {
      return (
        <div className="mdl-layout mdl-js-layout content">
          <div className="mdl-layout__inner-container">
            <header className={`mdl-layout__header ${s.header}`}>
              <div className={`mdl-layout__header-row ${s.row}`}>
                <Link className={`mdl-layout-title ${s.title}`} to="/" onClick={this.contentSubmit}>
                  <span><i className="fa fa-chevron-left" /> 返回</span>
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
    }

    return (
      <NoteLayout className={s.content}>
        <Spinner />
      </NoteLayout>
    );
  }
}

export default NoteEditPage;
