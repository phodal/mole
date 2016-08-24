/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
const MarkdownIt = require('markdown-it');

class TodoListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: props.data
    };
  }

  componentDidMount() {
    document.title = 'TodoList';
  }

  markdownToHtml(content) {
    return markdown.toHTML(content);
  }

  render() {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {
            console.error(err.stack);
          } // eslint-disable-line no-console
        }

        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {
          console.error(err.stack);
        } // eslint-disable-line no-console

        return '';
      },
    });
    
    var markdown = {
      __html: md.render(this.state.todo.body)
    };

    return (
      <Layout className={s.content}>
        <div dangerouslySetInnerHTML={markdown}/>
      </Layout>
    );
  }

}

export default TodoListPage;
