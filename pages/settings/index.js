import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import { Textfield, List, RadioGroup, Radio } from 'react-mdl/lib';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);

    function getLSItem(key) {
      const result = localStorage.getItem(key);
      if (result === null) {
        return '';
      }
      return result;
    }

    let editor = getLSItem('settings.editor');
    const repo = getLSItem('settings.repo');
    const token = getLSItem('settings.token');
    const username = getLSItem('settings.username');
    const email = getLSItem('settings.email');
    const ideasRepo = getLSItem('settings.ideas');

    if (!editor) {
      editor = 'markdown';
    }

    this.state = {
      NOTES_REPO: repo,
      GITHUB_TOKEN: token,
      COMMIT_USERNAME: username,
      COMMIT_EMAIL: email,
      IDEAS_REPO: ideasRepo,
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
    this.setState({
      NOTES_REPO: event.target.value,
    });
    localStorage.setItem('settings.repo', event.target.value);
    const splitValue = event.target.value.split('/');
    localStorage.setItem('settings.repo.username', splitValue[0]);
    localStorage.setItem('settings.repo.reponame', splitValue[1]);
  }

  handleIdeasRepoChange(event) {
    this.setState({
      IDEAS_REPO: event.target.value,
    });
    localStorage.setItem('settings.ideas', event.target.value);
  }

  handleTokenChange(event) {
    this.setState({
      GITHUB_TOKEN: event.target.value,
    });
    localStorage.setItem('settings.token', event.target.value);
  }

  handleUsernameChange(event) {
    this.setState({
      COMMIT_USERNAME: event.target.value,
    });
    localStorage.setItem('settings.username', event.target.value);
  }

  handleEmailChange(event) {
    this.setState({
      COMMIT_EMAIL: event.target.value,
    });
    localStorage.setItem('settings.email', event.target.value);
  }

  changeDefaultEditor(event) {
    localStorage.setItem('settings.editor', event.target.value);
  }

  render() {
    return (
      <Layout className={s.content}>
        <Textfield
          onChange={this.handleNotesRepoChange}
          pattern="([\w\.@\:/\-~]+)?"
          error="Input is not a valid GitHub url!"
          label="云笔记 Repo"
          floatingLabel
          value={this.state.NOTES_REPO}
          style={{ width: '100%' }}
        />
        <Textfield
          onChange={this.handleIdeasRepoChange}
          pattern="([\w\.@\:/\-~]+)?"
          error="Input is not a valid GitHub url!"
          label="Ideas Repo"
          floatingLabel
          value={this.state.IDEAS_REPO}
          style={{ width: '100%' }}
        />
        <Textfield
          onChange={this.handleTokenChange}
          label="GitHub Token"
          floatingLabel
          value={this.state.GITHUB_TOKEN}
          style={{ width: '100%' }}
        />
        <Textfield
          label="Commit Username"
          floatingLabel
          onChange={this.handleUsernameChange}
          value={this.state.COMMIT_USERNAME}
          style={{ width: '100%' }}
        />
        <Textfield
          label="Commit Email"
          floatingLabel
          onChange={this.handleEmailChange}
          value={this.state.COMMIT_EMAIL}
          style={{ width: '100%' }}
        />
        <div>
          <label>编辑器类型</label>
          <List>
            <RadioGroup
              childContainer="li"
              name="demo2"
              value={this.state.EDITOR}
              onChange={this.changeDefaultEditor}
            >

              <Radio value="markdown" ripple>Markdown</Radio>
              <Radio value="rich">富文本(Beta)</Radio>
            </RadioGroup>
          </List>
        </div>
      </Layout>
    );
  }
}

export default SettingsPage;
