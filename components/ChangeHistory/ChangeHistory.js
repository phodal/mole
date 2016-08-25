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
          <p>修改时间:<span>{this.renderTime(history.commit.author.date)}</span></p>
          <p>修改概要:<span>{history.commit.message}</span></p>
          <Button>查看修改</Button>
        </div>
      </div>
    );
  }

}

export default ChangeHistory;
