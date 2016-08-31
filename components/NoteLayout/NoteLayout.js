import React, {PropTypes} from "react";
import cx from "classnames";
import s from "./NoteLayout.css";
import {Link} from "react-router";

class NoteLayout extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    rootUrl: PropTypes.string
  };

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    var link = "/";
    if(this.props.rootUrl) {
      const {rootUrl} = this.props;
      link = rootUrl;
    }

    return (
      <div className="mdl-layout mdl-js-layout" ref={node => (this.root = node)}>
        <div className="mdl-layout__inner-container">
          <header className={`mdl-layout__header ${s.header}`}>
            <div className={`mdl-layout__header-row ${s.row}`}>
              <Link className={`mdl-layout-title ${s.title}`} to={link}>
                <span><i className="fa fa-chevron-left" /> 返回</span>
              </Link>
              <div className="mdl-layout-spacer"></div>
            </div>
          </header>
          <main className="mdl-layout__content">
            <div {...this.props} className={cx(s.content, this.props.className)}/>
          </main>
        </div>
      </div>
    );
  }
}

export default NoteLayout;
