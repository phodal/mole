import React from 'react';
import NoteLayout from '../../../components/NoteLayout';
import Textfield from 'react-mdl/lib/Textfield';
import FABButton from 'react-mdl/lib/FABButton';
import Snackbar from 'react-mdl/lib/Snackbar';
import s from './styles.css';
const GitHubApi = require('github-api');

class IdeasCreatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      isSnackbarActive: false,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.doCommit = this.doCommit.bind(this);
    this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
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

    const self = this;
    const github = new GitHubApi({
      token,
      auth: 'oauth',
    });
    const remoteIssue = github.getIssues('phodal', 'mole-test');

    const issue = {
      title: this.state.title,
      body: this.state.body,
    };

    remoteIssue.createIssue(issue, (err, data) => {
      if (data.title) {
        self.setState({
          isSnackbarActive: true,
          title: '',
          body: '',
        });
      }
      if (err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <NoteLayout rootUrl="/ideas">
        <div style={{ padding: '20px' }}>
          <div>
            <Textfield
              floatingLabel
              required
              onChange={this.handleTitleChange}
              label="标题..."
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

export default IdeasCreatePage;

