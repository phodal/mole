import React from 'react';
import NoteLayout from '../../../components/NoteLayout';
import s from './styles.css';
import {filter} from 'lodash';
import 'whatwg-fetch';
import Spinner from 'react-mdl/lib/Spinner';
import EditorSection from "../../../components/EditorSection";
const GitHubApi = require("github-api");

const MarkdownIt = require('markdown-it');

class NoteEditPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataReady: false,
    };
  }

  componentDidMount() {
    document.title = 'Edit - Note';

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
    //
    // var github = new GitHubApi({
    //   token: "f24fafb9a2499ecdd061e98ee9bf1655be13abe1",
    //   auth: "oauth"
    // });
    // var repo = github.getRepo('phodal', 'mole-test');
    //
    // repo.writeFile('gh-pages', 'content/test.json', "test", 'Robot: add article', function (err, data) {
    //   if(data.commit){
    //     console.log("--------------")
    //   }
    // });
  }

  render() {
    if (this.state.article) {
      return (
        <NoteLayout className={s.content}>
          <div className="markdown">
            <EditorSection content={this.state.article} />
          </div>
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

export default NoteEditPage;
