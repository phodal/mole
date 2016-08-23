import React, {PropTypes} from 'react';
import Button from 'react-mdl/lib/Button';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';

import Layout from '../../components/Layout';
import s from './styles.css';
import PopoverMenu from '../../calypso/popover/menu';
import Gridicon from '../../calypso/gridicon';
import CompactCard from '../../calypso/card/compact';

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
        <CompactCard className="page">
          <a className="page__title">
            { title }
          </a>
          <Gridicon icon="ellipsis" ref="popoverMenuButton" />
          <PopoverMenu position={ 'bottom left' }>

          </PopoverMenu>
          <ReactCSSTransitionGroup
            transitionName="updated-trans"
            transitionEnterTimeout={ 300 }
            transitionLeaveTimeout={ 300 }>
            { this.buildUpdateTemplate() }
          </ReactCSSTransitionGroup>
        </CompactCard>
      </Layout>
    );
  }

}

export default HomePage;
