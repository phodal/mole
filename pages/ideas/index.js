import React from "react";
import Layout from "../../components/Layout";
import s from "./styles.css";
import {Card, CardTitle, CardText} from "react-mdl/lib/Card";
import Spinner from "react-mdl/lib/Spinner";
import FABButton from "react-mdl/lib/FABButton";
import {Link} from 'react-router'

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
    var ideasRepo = localStorage.getItem('settings.ideas');
    if (!ideasRepo) {
      ideasRepo = "https://api.github.com/repos/phodal/mole/issues";
    } else {
      ideasRepo = "https://api.github.com/repos/" + ideasRepo + "/issues";
    }
    fetch(ideasRepo)
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
    if (str.length <= 100) {
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
              <Link key={i} to={`/ideas/view/${idea.number}`} style={{textDecoration: 'none'}}>
                <Card shadow={0} className={s.card}>
                  <CardTitle>{idea.title}</CardTitle>
                  <CardText>{this.getSubBody(idea.body)}</CardText>
                </Card>
              </Link>
            )}
          </div>

          <Link to='/ideas/create'>
            <FABButton colored ripple
                       style={{
                         float: "right",
                         position: "fixed",
                         right: "20px",
                         bottom: "20px",
                         zIndex: "100"
                       }}>
              <i className="fa fa-plus"/>
            </FABButton>
          </Link>
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

