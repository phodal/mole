import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import Button from 'react-mdl/lib/Button';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';
import Spinner from 'react-mdl/lib/Spinner';

class IdeasPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: null
    };
  }

  componentDidMount() {
    document.title = 'Ideas';

    var self = this;
    var api = "https://api.github.com/repos/phodal/ideas/issues";
    fetch(api)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({
          ideas: data
        });
      })
  }

  render() {
    if (this.state.ideas) {
      return (
        <Layout className={s.content}>
          <div className="note-list">
            {this.state.ideas.map((idea, i) =>
              <Card shadow={0} key={i} className={s.card}>
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
    } else {
      return (
        <Layout className={s.content}>
          <Spinner />
        </Layout>
      )
    }
  }

}

export default IdeasPage;
