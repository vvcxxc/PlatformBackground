import React, {Component} from 'react'
import styles from './index.less'
import {Input} from 'antd'
class AddActivity extends Component {
  state = {

  }

  render (){
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          集卡抽奖
        </div>
        <div className={styles.main}>
          <div className={styles.title}>配置活动基本信息</div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>设置活动名称</div>
            <Input size='small' style={{width: '390px'}}/>
          </div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>设置活动时间</div>
            <Input size='small' style={{width: '390px'}}/>
          </div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>活动名称</div>
            <Input size='small' style={{width: '390px'}}/>
          </div>
        </div>
      </div>
    )
  }
}

export default AddActivity
