import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import {Textfield} from 'react-mdl/lib';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      GITHUB_REPO: '',
      GITHUB_TOKEN: ''
    };

    this.handleRepoChange = this.handleRepoChange.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
  }

  componentDidMount() {
    document.title = 'Settings';
  }

  handleRepoChange(event) {
    this.setState({
      GITHUB_REPO: event.target.value
    });
    console.log(this.state);
  }

  handleTokenChange(event) {
    this.setState({
      GITHUB_TOKEN: event.target.value
    });
    console.log(this.state);
  }

  render() {
    return (
      <Layout className={s.content}>
        <Textfield
          onChange={this.handleRepoChange}
          pattern="((git|ssh|http(s)?)|(git@[\w\.]+))(:(//)?)([\w\.@\:/\-~]+)(\.git)(/)?"
          error="Input is not a valid GitHub url!"
          label="GitHub Repo"
          floatingLabel
        />
        <Textfield
          onChange={this.handleTokenChange}
          label="GitHub Token"
          floatingLabel
        />
      </Layout>
    );
  }

}

export default SettingsPage;
