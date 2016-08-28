import React, {PropTypes} from 'react';
import s from './ChangeHistory.css';
import Button from 'react-mdl/lib/Button';

var moment = require('moment');
moment.locale('zh-CN');

class ChangeHistory extends React.Component {
  renderTime(time) {
    return moment(time).fromNow();
  }

  render() {
    const history = this.props.data;

    return (
      <div>
        <div className={s.detail}>
          <p><span>{this.renderTime(history.commit.author.date)}</span>，<span>{history.commit.message}</span></p>
          <Button raised ripple>详情</Button>
        </div>
      </div>
    );
  }

}

export default ChangeHistory;
