import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import Button from 'react-mdl/lib/Button';
import {Card, CardTitle, CardText, CardActions} from 'react-mdl/lib/Card';
import Spinner from 'react-mdl/lib/Spinner';
import FABButton from 'react-mdl/lib/FABButton';

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

  getSubBody(str) {
    if(str.length <= 100) {
      return "暂无详细内容";
    } else {
      return str.substring(0, 100);
    }
  }

  render() {
    if (this.state.ideas) {
      return (
        <Layout className={s.content}>
          <div className="note-list">
            {this.state.ideas.map((idea, i) =>
              <Card shadow={0} key={i} className={s.card}>
                <CardTitle>{idea.title}</CardTitle>
                <CardText>{this.getSubBody(idea.body)}</CardText>
              </Card>
            )}
          </div>

          <FABButton colored
                     style={{float: "right", position: "fixed", right: "20px", bottom: "20px", zIndex: "100"}}>
            <i className="fa fa-plus"/>
          </FABButton>
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
