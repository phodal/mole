/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';

import Button from 'react-mdl/lib/Button';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';

class HomePage extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
  };

  componentDidMount() {
    document.title = "";
  }

  render() {
    return (
      <Layout className={s.content}>
        <div className="note-list">
          {this.props.articles.map((article, i) =>
            <Card shadow={0} key={i}>
              <CardTitle>{article.title}</CardTitle>
              <CardText>{article.description}</CardText>
              <CardActions border>
                <Button colored>Edit</Button>
                <Button colored>View</Button>
                <Button colored>Trash</Button>
              </CardActions>
            </Card>
          )}
        </div>
        <p>
          <br /><br />
        </p>
      </Layout>
    );
  }

}

export default HomePage;
