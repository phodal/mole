import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import {Textfield} from 'react-mdl/lib';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    var repo = localStorage.getItem('settings.repo');
    var token = localStorage.getItem('settings.token');

    if(repo && token) {
      this.state = {
        GITHUB_REPO: repo,
        GITHUB_TOKEN: token
      };
    } else {
      this.state = {
        GITHUB_REPO: '',
        GITHUB_TOKEN: ''
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
      </Layout>
    );
  }

}

export default SettingsPage;
