import * as React from 'react';
import { Editor, EditorState, ContentState, convertFromHTML, RichUtils } from 'draft-js';
import StyleButton from '../StyleButton';
import s from './EditorSection.css';

import { stateToHTML } from 'draft-js-export-html';

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}


const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type, i) =>
        <StyleButton
          key={i}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type, i) =>
        <StyleButton
          key={i}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

class EditorSection extends React.Component {
  constructor(props) {
    super(props);

    const blocks = convertFromHTML(this.props.content);
    const editorState = EditorState.createWithContent(ContentState.createFromBlockArray(blocks));
    this.state = {
      editorState,
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.onChange(editorState);

    this.handleKeyCommand = (command) => this.handleKeyCommand(command);
    this.toggleBlockType = (type) => this.toggleBlockType(type);
    this.toggleInlineStyle = (style) => this.toggleInlineStyle(style);
  }

  onChange(editorState) {
    this.setState({
      editorState,
    });
    const html = stateToHTML(editorState.getCurrentContent());
    this.props.onChange(html);
  }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const { editorState } = this.state;

    return (
      <div>
        <div className="RichEditor-root">
          <div className={s.editorStyle} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
        <div className={s.controlBar}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>
      </div>
    );
  }
}

export default EditorSection;
