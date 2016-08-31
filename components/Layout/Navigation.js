import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <nav className="mdl-navigation" ref={node => (this.root = node)}>
        <Link className="mdl-navigation__link" to="/ideas" style={{ fontSize: '20px' }}>
          <i className="fa fa-lightbulb-o" />
        </Link>
        <Link className="mdl-navigation__link" to="/settings" style={{ fontSize: '20px' }}>
          <i className="fa fa-cog" />
        </Link>
      </nav>
    );
  }

}

export default Navigation;
