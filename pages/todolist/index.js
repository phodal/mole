import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import MarkdownIt from 'markdown-it';

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

  render() {
    const md = new MarkdownIt({html: true, linkify: true});

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
