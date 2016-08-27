import React, {PropTypes} from 'react';
import Button from 'react-mdl/lib/Button';
import FABButton from 'react-mdl/lib/FABButton';
import Spinner from 'react-mdl/lib/Spinner';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';
import {Dialog, DialogTitle, DialogContent, DialogActions} from 'react-mdl/lib/Dialog';
import {Link} from 'react-router'
import Layout from '../../components/Layout';
import ChangeHistory from '../../components/ChangeHistory';
import s from './styles.css';
var moment = require('moment');

moment.locale('zh-CN');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    var content = localStorage.getItem("content");
    if (content) {
      content = JSON.parse(content)
    } else {
      content = [];
    }

    this.state = {
      articles: content,
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog(title, path) {
    var self = this;
    var url = 'https://api.github.com/repos/phodal/mole-test/commits?path=' + path;
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({
          openDialog: true,
          changeTitle: title,
          changeHistory: data
        });
      });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  componentDidMount() {
    document.title = "Home";
    var self = this;

    var api = "https://phodal.github.io/mole-test/api/all.json";
    fetch(api)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        localStorage.setItem("base_url", data.source);
        localStorage.setItem("content", JSON.stringify(data.content));

        self.setState({
          articles: data.content
        });
      })
  }

  renderTime(time) {
    return moment(time).fromNow();
  }

  render() {
    if (this.state.articles) {
      return (
        <Layout className={s.content}>
          <div className="note-list">
            {this.state.articles.map((article, i) =>
              <Card shadow={0} key={i} style={{width: '100%', margin: '0 auto 16px'}}>
                <CardTitle>{article.title}</CardTitle>
                <CardText>{article.description}</CardText>
                <CardActions border>
                  <Button colored>创建于: {this.renderTime(article.created)}</Button>
                  <Button colored>修改于: {this.renderTime(article.updated)}</Button>
                  <Button colored onClick={ () => this.handleOpenDialog(article.title, article.path)} raised
                          ripple>历史</Button>
                </CardActions>
                <CardActions border>
                  <ul className={s.cardAction}>
                    <li><Link to={`/notes/edit/${article.id}`}><Button raised ripple>编辑</Button></Link></li>
                    <li><Link to={`/notes/view/${article.id}`}><Button raised ripple>查看</Button></Link></li>
                    <li><Button raised ripple>删除</Button></li>
                  </ul>
                </CardActions>
              </Card>
            )}
          </div>

          <FABButton colored
                     style={{float: "right", position: "fixed", right: "20px", bottom: "20px", zIndex: "100"}}>
            <i className="fa fa-plus"/>
          </FABButton>

          <Dialog open={this.state.openDialog}>
            <DialogTitle>修改历史</DialogTitle>
            <DialogContent>
              <h4>{this.state.changeTitle}</h4>
              {this.state.changeHistory && this.state.changeHistory.map((changeHistory, i) =>
                <ChangeHistory key={i} data={changeHistory}/>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDialog}>关闭</Button>
            </DialogActions>
          </Dialog>
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

export default HomePage;
