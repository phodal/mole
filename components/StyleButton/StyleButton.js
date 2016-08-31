import { React, PropType } from 'react';

class StyleButton extends React.Component {

  static propTypes = {
    style: PropType.object,
    active: PropType.object,
    label: PropType.string,
  };

  constructor(props) {
    super(props);
    const self = this;
    this.onToggle = (e) => {
      e.preventDefault();
      self.props.onToggle(self.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

export default StyleButton;
