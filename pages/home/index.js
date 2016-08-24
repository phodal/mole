import React, {PropTypes} from 'react';
import Button from 'react-mdl/lib/Button';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';
import Link from '../../components/Link';
import Layout from '../../components/Layout';
import s from './styles.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: props.data.content,
      base_url: props.data.source
    };
  }

  componentDidMount() {
    document.title = "";
  }

  render() {
    return (
      <Layout className={s.content}>
        <div className="note-list">
          {this.state.articles.map((article, i) =>
            <Card shadow={0} key={i} style={{width: '100%', margin: '0 auto 16px'}}>
              <CardTitle>{article.title}</CardTitle>
              <CardText>{article.description}</CardText>
              <CardActions border>
                <Button colored><Link to={`/notes/edit?path="${this.state.base_url + article.path}"`}>Edit</Link></Button>
                <Button colored>View</Button>
                <Button colored>Trash</Button>
              </CardActions>
            </Card>
          )}
        </div>
      </Layout>
    );
  }

}

export default HomePage;
