import React, { PropTypes } from 'react';
import NoteLayout from '../../../components/NoteLayout';
import s from './styles.css';
import { filter } from 'lodash';
import 'whatwg-fetch';
import Spinner from 'react-mdl/lib/Spinner';
const MarkdownIt = require('markdown-it');

class NoteViewPage extends React.Component {
  static propTypes = {
    routeParams: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDataReady: false,
    };
    const key = `note.${this.props.routeParams.id}`;
    const note = localStorage.getItem(key);
    if (note) {
      this.state.article = note;
    }
  }

  componentDidMount() {
    document.title = 'View - Note';

    const id = this.props.routeParams.id;
    const content = localStorage.getItem('content');
    const baseUrl = localStorage.getItem('base_url');
    const self = this;

    if (content) {
      const articles = JSON.parse(content);
      const basicArticleInfo = filter(articles, { id })[0];
      const articleUrl = baseUrl + basicArticleInfo.path;
      fetch(articleUrl)
        .then(response => response.text())
        .then(data => {
          localStorage.setItem(`note.${id}`, data);

          self.setState({
            article: data,
            isDataReady: true,
          });
        });
    }
  }

  renderMarkdown(content) {
    const md = new MarkdownIt({ html: true, linkify: true });
    return {
      __html: md.render(content),
    };
  }

  render() {
    if (this.state.article) {
      return (
        <NoteLayout className={s.content}>
          <div
            className="markdown"
            dangerouslySetInnerHTML={this.renderMarkdown(this.state.article)}
          >
          </div>
        </NoteLayout>
      );
    }

    return (
      <NoteLayout className={s.content}>
        <Spinner />
      </NoteLayout>
    );
  }
}

export default NoteViewPage;
