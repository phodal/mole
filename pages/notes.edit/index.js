import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';

class NoteEditPage extends React.Component {

  componentDidMount() {
    document.title = 'Edit - Note';
  }

  render() {
    return (
      <Layout className={s.content}>
        <div>some note</div>
      </Layout>
    );
  }

}

export default NoteEditPage;
