import * as React from "react";
import {Editor, EditorState, ContentState, convertFromHTML, RichUtils} from 'draft-js';

class EditorSection extends React.Component {
  constructor(props) {
    super(props);

    var blocks = convertFromHTML(this.props.content);
    var editorState = EditorState.createWithContent(ContentState.createFromBlockArray(blocks));
    this.state = {
      editorState: editorState
    };

    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }


  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange}
      />
    );
  }
}

export default EditorSection;
