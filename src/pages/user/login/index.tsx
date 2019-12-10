import { Alert, Checkbox, Icon } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { ConnectState } from '@/models/connect';



@connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {

  state: {

  }


  render() {
    return (
      <div className={styles.main}>

      </div>
    );
  }
}

export default Login;
