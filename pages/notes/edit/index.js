import React from 'react';
import Layout from '../../../components/Layout';
import s from './styles.css';
import {filter} from 'lodash';
import 'whatwg-fetch';
import {Editor, EditorState, ContentState, convertFromHTML, RichUtils} from 'draft-js';

const MarkdownIt = require('markdown-it');

class NoteEditPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataReady: false,
      editorState: EditorState.createEmpty()
    };

    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  componentDidMount() {
    document.title = 'Edit - Note';

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
          var md = new MarkdownIt({html: true, linkify: true});
          var renderedHTML = md.render(data);
          var blocks = convertFromHTML(renderedHTML);
          var editorState = EditorState.createWithContent(ContentState.createFromBlockArray(blocks));
          self.setState({
            article: data,
            isDataReady: true,
            editorState: editorState
          });
        })
    } else {
      console.log("-----------------------");
      console.log("Back to Home and Refresh");
    }
  }

  render() {
    if (this.state.article) {
      return (
        <Layout className={s.content}>
          <div className={s.markdown}>
            <Editor
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
            />
          </div>
        </Layout>
      );
    } else {
      return (
        <Layout className={s.content}>
          loading....
        </Layout>
      )
    }
  }

}

export default NoteEditPage;
