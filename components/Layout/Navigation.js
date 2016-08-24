/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';
import s from './Navigation.css';

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
        <Link className="mdl-navigation__link" to="/todolist" style={{fontSize: '20px'}}><i className="fa fa-list"></i></Link>
        <Link className="mdl-navigation__link" to="/ideas" style={{fontSize: '20px'}}><i className="fa fa-lightbulb-o"></i></Link>
        <Link className="mdl-navigation__link" to="/settings" style={{fontSize: '20px'}}><i className="fa fa-cog"></i></Link>
      </nav>
    );
  }

}

export default Navigation;
