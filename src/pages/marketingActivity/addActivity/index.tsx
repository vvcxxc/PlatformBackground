import React, {Component} from 'react'
import styles from './index.less';
import {Input,Select} from 'antd'
const { Option } = Select;
export default class AddActivity extends Component {
  state = {

  };

  selectArea = (value: string) => {
    console.log(`selected ${value}`);
  }

  render (){
    return (
      <div className={styles.addPage}>
        <div className={styles.header}>
          配置活动招募设置
        </div>
        <div className={styles.add_layout}>
          <div className={styles.title}>设置活动名称</div>
          <Input size='small' style={{width: '40%'}}/>
        </div>
        <div className={styles.add_layout}>
          <div className={styles.title}>设置活动区域</div>
          <Select defaultValue="lucy" style={{ width: 120 }} size='small' onChange={this.selectArea}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
      </div>
    )
  }
}
