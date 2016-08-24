import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import Button from 'react-mdl/lib/Button';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';
import Link from '../../components/Link';

class IdeasPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: props.data
    };
  }

  componentDidMount() {
    document.title = 'Ideas';
  }

  render() {
    return (
      <Layout className={s.content}>
        <div className="note-list">
          {this.state.ideas.map((idea, i) =>
            <Card shadow={0} key={i} style={{width: '100%', margin: '0 auto 16px', minHeight: 'auto'}}>
              <CardTitle>{idea.title}</CardTitle>
              <CardText>{idea.body}</CardText>
              <CardActions border>
                <Button colored>Edit</Button>
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

export default IdeasPage;
