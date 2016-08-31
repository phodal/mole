import React from "react";
import NoteLayout from "../../../components/NoteLayout";
import Textfield from 'react-mdl/lib/Textfield';
import FABButton from "react-mdl/lib/FABButton";
var GitHubApi = require("github-api");

class IdeasCreatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: ''
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.doCommit = this.doCommit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleBodyChange(event) {
    this.setState({
      body: event.target.value
    });
  }


  doCommit() {
    if (!(this.state.title && this.state.body)) {
      return;
    }

    console.log(this.state);
    console.log(this.state.body);


    const token = localStorage.getItem('settings.token');
    const username = localStorage.getItem('settings.username');
    const email = localStorage.getItem('settings.email');

    var github = new GitHubApi({
      token: token,
      auth: "oauth"
    });
    var remoteIssue = github.getIssues('phodal', 'mole-test');

    var issue = {
      title: this.state.title,
      body: this.state.body
    };

    remoteIssue.createIssue(issue, function(err, data) {
      console.log(data);
      if (data.title) {
        console.log("creat issue successful");
      }
      if (err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <NoteLayout rootUrl='/ideas'>
        <div style={{padding: '20px'}}>
          <div>
            <Textfield
              floatingLabel
              required
              onChange={this.handleTitleChange}
              label="标题..."
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
      </NoteLayout>
    )
  }

}

export default IdeasCreatePage;

