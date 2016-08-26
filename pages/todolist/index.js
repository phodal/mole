import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import MarkdownIt from 'markdown-it';
import Spinner from 'react-mdl/lib/Spinner';

class TodoListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: null
    };
  }

  componentDidMount() {
    document.title = 'TodoList';

    var self = this;
    var api = "https://api.github.com/repos/phodal/mole-test/issues/1";
    fetch(api)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.body);
        self.setState({
          todo: data
        });
      })
  }

  render() {
    if(this.state.todo){
      const md = new MarkdownIt({html: true, linkify: true});

      var markdown = {
        __html: md.render(this.state.todo.body)
      };

      return (
        <Layout className={s.content}>
          <div dangerouslySetInnerHTML={markdown}/>
        </Layout>
      );
    } else {
      return (
        <Layout className={s.content}>
          <Spinner />
        </Layout>
      )
    }
  }

}

export default TodoListPage;
