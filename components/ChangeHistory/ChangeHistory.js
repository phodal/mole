import React, { PropTypes } from 'react';
import s from './ChangeHistory.css';
const moment = require('moment');

moment.locale('zh-CN');

class ChangeHistory extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };

  renderTime(time) {
    return moment(time).fromNow();
  }

  render() {
    const history = this.props.data;

    return (
      <div>
        <div className={s.detail}>
          <p>
            <span>{this.renderTime(history.commit.author.date)}</span>，
            <span>{history.commit.message}</span>
          </p>
        </div>
      </div>
    );
  }

}

export default ChangeHistory;
