import React, {PropTypes} from 'react';
import Button from 'react-mdl/lib/Button';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';
import Link from '../../components/Link';
import Layout from '../../components/Layout';
import s from './styles.css';
var moment = require('moment');

moment.locale('zh-CN');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    var content = props.data.content;
    var baseUrl = props.data.source;
    this.state = {
      articles: content,
      base_url: baseUrl
    };
    localStorage.setItem("base_url", baseUrl);
    localStorage.setItem("content", JSON.stringify(content));
  }

  componentDidMount() {
    document.title = "";
  }

  renderTime(time){
    return moment(time).fromNow();
  }

  render() {
    return (
      <Layout className={s.content}>
        <div className="note-list">
          {this.state.articles.map((article, i) =>
            <Card shadow={0} key={i} style={{width: '100%', margin: '0 auto 16px'}}>
              <CardTitle>{article.title}</CardTitle>
              <CardText>{article.description}</CardText>
              <CardActions border>
                <Button colored>创建时间: {this.renderTime(article.created)}</Button>
                <Button colored>上次修改: {this.renderTime(article.updated)}</Button>
                <Button colored>修改历史</Button>
              </CardActions>
              <CardActions border>
                <Button colored><Link to={`/notes/edit/${article.id}`}>Edit</Link></Button>
                <Button colored><Link to={`/notes/view/${article.id}`}>View</Link></Button>
                <Button colored>Trash</Button>
              </CardActions>
            </Card>
          )}
        </div>
      </Layout>
    );
  }

}

export default HomePage;
