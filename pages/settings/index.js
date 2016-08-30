import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import {Textfield} from 'react-mdl/lib';
import {RadioGroup, Radio} from 'react-mdl/lib';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);

    var getLSItem = function (key) {
      var result = localStorage.getItem(key);
      if (result === null) {
        return ''
      }
      return result;
    };

    var repo = getLSItem('settings.repo');
    var token = getLSItem('settings.token');
    var editor = getLSItem('settings.editor');
    var username = getLSItem('settings.username');
    var email = getLSItem('settings.email');
    var ideas_repo = getLSItem('settings.ideas');

    if (!editor) {
      editor = 'markdown'
    }

    this.state = {
      NOTES_REPO: repo,
      GITHUB_TOKEN: token,
      COMMIT_USERNAME: username,
      COMMIT_EMAIL: email,
      IDEAS_REPO: ideas_repo,
      EDITOR: editor,
    };

    this.handleNotesRepoChange = this.handleNotesRepoChange.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleIdeasRepoChange = this.handleIdeasRepoChange.bind(this);
  }

  componentDidMount() {
    document.title = 'Settings';
  }

  handleNotesRepoChange(event) {
    var repo = event.target.value;
    this.setState({
      NOTES_REPO: repo
    });
    localStorage.setItem('settings.repo', repo);
  }

  handleIdeasRepoChange(event) {
    var repo = event.target.value;
    this.setState({
      NOTES_REPO: repo
    });
    localStorage.setItem('settings.ideas', repo);
  }

  handleTokenChange(event) {
    var token = event.target.value;
    this.setState({
      GITHUB_TOKEN: token
    });
    localStorage.setItem('settings.token', token);
  }

  handleUsernameChange(event) {
    var username = event.target.value;
    this.setState({
      GITHUB_TOKEN: username
    });
    localStorage.setItem('settings.username', username);
  }

  handleEmailChange(event) {
    var email = event.target.value;
    this.setState({
      GITHUB_TOKEN: email
    });
    localStorage.setItem('settings.email', email);
  }

  changeDefaultEditor(event) {
    console.log(event.target.value);
    localStorage.setItem('settings.editor', event.target.value);
  }

  render() {
    return (
      <Layout className={s.content}>
        <Textfield
          onChange={this.handleNotesRepoChange}
          pattern="((git|ssh|http(s)?)|(git@[\w\.]+))(:(//)?)([\w\.@\:/\-~]+)?"
          error="Input is not a valid GitHub url!"
          label="云笔记 Repo"
          floatingLabel
          value={this.state.NOTES_REPO}
          style={{width: '100%'}}
        />
        <Textfield
          onChange={this.handleIdeasRepoChange}
          pattern="((git|ssh|http(s)?)|(git@[\w\.]+))(:(//)?)([\w\.@\:/\-~]+)?"
          error="Input is not a valid GitHub url!"
          label="Ideas Repo"
          floatingLabel
          value={this.state.IDEAS_REPO}
          style={{width: '100%'}}
        />
        <Textfield
          onChange={this.handleTokenChange}
          label="GitHub Token"
          floatingLabel
          value={this.state.GITHUB_TOKEN}
          style={{width: '100%'}}
        />
        <Textfield
          label="Commit Username"
          floatingLabel
          onChange={this.handleUsernameChange}
          value={this.state.COMMIT_USERNAME}
          style={{width: '100%'}}
        />
        <Textfield
          label="Commit Email"
          floatingLabel
          onChange={this.handleEmailChange}
          value={this.state.COMMIT_EMAIL}
          style={{width: '100%'}}
        />
        <div>
          <label>编辑器类型</label>
          <RadioGroup childContainer="li" name="demo2" value={this.state.EDITOR} onChange={this.changeDefaultEditor}>
            <Radio value="markdown" ripple>Markdown</Radio>
            <Radio value="rich">富文本(Beta)</Radio>
          </RadioGroup>
        </div>
      </Layout>
    );
  }
}

export default SettingsPage;
