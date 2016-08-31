import React from "react";
import NoteLayout from "../../../components/NoteLayout";
import Textfield from 'react-mdl/lib/Textfield';
import FABButton from "react-mdl/lib/FABButton";
import Snackbar from "react-mdl/lib/Snackbar";
var GitHubApi = require("github-api");

class NotesCreatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      url: '',
      isSnackbarActive: false
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.doCommit = this.doCommit.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleUrlChange(event) {
    this.setState({
      url: event.target.value
    });
  }

  handleBodyChange(event) {
    this.setState({
      body: event.target.value
    });
  }

  handleTimeoutSnackbar() {
    this.setState({isSnackbarActive: false});
  }

  doCommit() {
    if (!(this.state.title && this.state.body)) {
      return;
    }

    const token = localStorage.getItem('settings.token');
    const username = localStorage.getItem('settings.username');
    const email = localStorage.getItem('settings.email');

    var github = new GitHubApi({
      token: token,
      auth: "oauth"
    });
    var repo = github.getRepo('phodal', 'mole-test');

    var options = {
      committer: {
        name: username,
        email: email
      },
    };

    repo.writeFile('gh-pages', 'notes/' + this.state.url, this.state.body, 'Robot: add article ' + this.state.title, options, function(err, data) {
      if (data.commit) {
        console.log("commit successful");
      }
      if (err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <NoteLayout rootUrl='/'>
        <div style={{padding: '20px'}}>
          <div>
            <Textfield
              floatingLabel
              required
              onChange={this.handleTitleChange}
              label="标题..."
              style={{width: '100%'}}
            />
            <Textfield
              floatingLabel
              required
              onChange={this.handleUrlChange}
              label="URL..."
              style={{width: '100%'}}
            />
          </div>
          <div>
            <Textfield
              floatingLabel
              onChange={this.handleBodyChange}
              required
              label="内容..."
              rows={10}
              style={{width: '100%', height: '100%', display: 'block'}}
            />
          </div>
        </div>

        <FABButton
          onClick={this.doCommit}
          style={{float: "right", position: "fixed", right: "20px", bottom: "20px", zIndex: "100"}}
        >
          <i className="fa fa-send-o"/>
        </FABButton>

        <Snackbar
          onTimeout={this.handleTimeoutSnackbar}
          active={this.state.isSnackbarActive}>
          Create Successful</Snackbar>
      </NoteLayout>
    )
  }
}

export default NotesCreatePage;

