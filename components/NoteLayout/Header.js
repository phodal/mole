import React from "react";
import {Link} from "react-router";
import s from "./Header.css";

class Header extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <header className={`mdl-layout__header ${s.header}`} ref={node => (this.root = node)}>
        <div className={`mdl-layout__header-row ${s.row}`}>
          <Link className={`mdl-layout-title ${s.title}`} to="/">
            <span><i className="fa fa-chevron-left"></i> 返回</span>
          </Link>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link"  style={{fontSize: '20px'}}><i className="fa fa-send"></i></a>
          </nav>
        </div>
      </header>
    );
  }

}

export default Header;
