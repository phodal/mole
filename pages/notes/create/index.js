import React from 'react';
import NoteLayout from '../../../components/NoteLayout';
import Textfield from 'react-mdl/lib/Textfield';
import FABButton from 'react-mdl/lib/FABButton';
import Snackbar from 'react-mdl/lib/Snackbar';
import { filter } from 'lodash';
import s from './styles.css';
const GitHubApi = require('github-api');
const moment = require('moment');

class NotesCreatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      url: '',
      isSnackbarActive: false,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.doCommit = this.doCommit.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleUrlChange(event) {
    this.setState({
      url: event.target.value,
    });
  }

  handleBodyChange(event) {
    this.setState({
      body: event.target.value,
    });
  }

  handleTimeoutSnackbar() {
    this.setState({
      isSnackbarActive: false,
    });
  }

  doCommit() {
    if (!(this.state.title && this.state.body)) {
      return;
    }

    const token = localStorage.getItem('settings.token');
    const username = localStorage.getItem('settings.username');
    const email = localStorage.getItem('settings.email');

    const github = new GitHubApi({
      token,
      auth: 'oauth',
    });
    const repo = github.getRepo('phodal', 'mole-test');
    const self = this;

    const options = {
      committer: {
        name: username,
        email,
      },
    };

    const api = 'https://phodal.github.io/mole-test/api/all.json';
    fetch(api)
      .then(response => response.json())
      .then(data => {
        const content = JSON.stringify(data.content);

        localStorage.setItem('base_url', data.source);
        localStorage.setItem('content', content);

        const path = `notes/${self.state.url}.md`;

        const isPathExists = filter(content, { path });
        if (isPathExists.length === 0) {
          const message = `Robot: add article ${self.state.title}`;
          repo.writeFile('gh-pages', path, self.state.body, message, options, (err, res) => {
            if (res.commit) {
              console.log('create note successful');
            }
            if (err) {
              console.log(err);
            }
          });

          const response = data;
          const articleInfo = {
            description: self.state.body.substr(0, 100),
            title: self.state.title,
            path,
            created: moment().format(),
            updated: moment().format(),
            id: response.latest.id + 1,
          };
          response.latest.id = response.latest.id + 1;
          response.content.push(articleInfo);

          const message2 = 'Robot: update API ';
          repo.writeFile('gh-pages', 'api/all.json', JSON.stringify(response), message2, options,
            (err, res) => {
              if (res.commit) {
                console.log('update API successful');
              }
              if (err) {
                alert(err);
              }
            }
          );
        }
      });
  }

  render() {
    return (
      <NoteLayout rootUrl="/">
        <div style={{ padding: '20px' }}>
          <div>
            <Textfield
              floatingLabel
              required
              onChange={this.handleTitleChange}
              label="标题..."
              style={{ width: '100%' }}
            />
            <Textfield
              floatingLabel
              required
              onChange={this.handleUrlChange}
              label="URL..."
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <Textfield
              floatingLabel
              onChange={this.handleBodyChange}
              required
              label="内容..."
              rows={10}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>
        </div>

        <FABButton
          onClick={this.doCommit}
          className={s.fabButton}
        >
          <i className="fa fa-send-o" />
        </FABButton>

        <Snackbar
          onTimeout={this.handleTimeoutSnackbar}
          active={this.state.isSnackbarActive}
        >
          Create Successful
        </Snackbar>
      </NoteLayout>
    );
  }
}

export default NotesCreatePage;

