import React from 'react';
import Button from 'react-mdl/lib/Button';
import FABButton from 'react-mdl/lib/FABButton';
import Spinner from 'react-mdl/lib/Spinner';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import { Dialog, DialogContent, DialogActions } from 'react-mdl/lib/Dialog';
import { Link } from 'react-router';
import Layout from '../../components/Layout';
import ChangeHistory from '../../components/ChangeHistory';
import s from './styles.css';
const moment = require('moment');

moment.locale('zh-CN');

class NoteCreatePage extends React.Component {
  constructor(props) {
    super(props);
    let content = localStorage.getItem('content');
    if (content) {
      content = JSON.parse(content);
    } else {
      content = [];
    }

    this.state = {
      articles: content,
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  componentDidMount() {
    document.title = 'Home';
    const self = this;

    const api = 'https://phodal.github.io/mole-test/api/all.json';
    fetch(api)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('base_url', data.source);
        localStorage.setItem('content', JSON.stringify(data.content));

        self.setState({
          articles: data.content,
        });
      });
  }

  handleOpenDialog(title, path) {
    const self = this;
    const url = `https://api.github.com/repos/phodal/mole-test/commits?path=${path}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        self.setState({
          openDialog: true,
          changeTitle: title,
          changeHistory: data,
        });
      });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false,
    });
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
              <Card shadow={0} key={i} style={{ width: '100%', margin: '0 auto 16px' }}>
                <CardTitle>{article.title}</CardTitle>
                <CardText>{article.description}</CardText>
                <CardActions border style={{ textAlign: 'center' }}>
                  <Button colored>创建于: {this.renderTime(article.created)}</Button>
                  <Button colored>修改于: {this.renderTime(article.updated)}</Button>
                </CardActions>
                <CardActions border>
                  <ul className={s.cardAction} style={{ textAlign: 'center', paddingLeft: '0' }}>
                    <li>
                      <Link to={`/notes/edit/${article.id}`}>
                        <Button raised ripple>编辑</Button>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/notes/view/${article.id}`}>
                        <Button raised ripple>查看</Button>
                      </Link>
                    </li>
                    <li>
                      <Button
                        colored
                        onClick={() => this.handleOpenDialog(article.title, article.path)}
                        raised
                        ripple
                      >
                        历史
                      </Button></li>
                  </ul>
                </CardActions>
              </Card>
            )}
          </div>

          <Link to="/notes/create">
            <FABButton colored className={s.fabButton}>
              <i className="fa fa-plus" />
            </FABButton>
          </Link>

          <Dialog open={this.state.openDialog} style={{ maxHeight: '80%', overflow: 'scroll' }}>
            <DialogContent>
              <h4>{this.state.changeTitle}</h4>
              {this.state.changeHistory && this.state.changeHistory.map((changeHistory, i) =>
                <ChangeHistory key={i} data={changeHistory} />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDialog}>关闭</Button>
            </DialogActions>
          </Dialog>
        </Layout>
      );
    }

    return (
      <Layout className={s.content}>
        <Spinner />
      </Layout>
    );
  }
}

export default NoteCreatePage;
