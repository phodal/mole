import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';

class IdeasPage extends React.Component {

  componentDidMount() {
    document.title = 'Ideas';
  }

  render() {
    return (
      <Layout className={s.content}>
        <ul>
          <li>some ideas</li>
          <li>some ideas</li>
          <li>some ideas</li>
        </ul>
      </Layout>
    );
  }

}

export default IdeasPage;
