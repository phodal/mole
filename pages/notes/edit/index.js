import React from 'react';
import Layout from '../../../components/Layout';
import s from './styles.css';
import {filter} from 'lodash';
import 'whatwg-fetch';

class NoteEditPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
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
          self.setState({article: data})
        });
    } else {
      console.log("-----------------------");
      console.log("Back to Home and Refresh");
    }
  }

  componentDidMount() {
    document.title = 'Edit - Note';
  }

  render() {
    console.log(this.state);

    return (
      <Layout className={s.content}>
        <div>.......</div>
      </Layout>
    );
  }

}

export default NoteEditPage;
