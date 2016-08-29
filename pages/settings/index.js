import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import {Textfield} from 'react-mdl/lib';
import {RadioGroup, Radio} from 'react-mdl/lib';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    var repo = localStorage.getItem('settings.repo');
    var token = localStorage.getItem('settings.token');
    var editor = localStorage.getItem('settings.editor');

    if (!editor) {
      editor = 'markdown'
    }

    if (repo && token) {
      this.state = {
        GITHUB_REPO: repo,
        GITHUB_TOKEN: token,
        EDITOR: editor,
      };
    } else {
      this.state = {
        GITHUB_REPO: '',
        GITHUB_TOKEN: '',
        EDITOR: editor,
      };
    }


    this.handleRepoChange = this.handleRepoChange.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
  }

  componentDidMount() {
    document.title = 'Settings';
  }

  handleRepoChange(event) {
    var githubrepo = event.target.value;
    this.setState({
      GITHUB_REPO: githubrepo
    });
    localStorage.setItem('settings.repo', githubrepo);
  }

  handleTokenChange(event) {
    var githubtoken = event.target.value;
    this.setState({
      GITHUB_TOKEN: githubtoken
    });
    localStorage.setItem('settings.token', githubtoken);
  }


  changeDefaultEditor(event) {
    console.log(event.target.value);
    localStorage.setItem('settings.editor', event.target.value);
  }

  render() {
    return (
      <Layout className={s.content}>
        <Textfield
          onChange={this.handleRepoChange}
          pattern="((git|ssh|http(s)?)|(git@[\w\.]+))(:(//)?)([\w\.@\:/\-~]+)?"
          error="Input is not a valid GitHub url!"
          label="GitHub Repo"
          floatingLabel
          value={this.state.GITHUB_REPO}
          style={{width: '100%'}}
        />
        <Textfield
          onChange={this.handleTokenChange}
          label="GitHub Token"
          floatingLabel
          value={this.state.GITHUB_TOKEN}
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
