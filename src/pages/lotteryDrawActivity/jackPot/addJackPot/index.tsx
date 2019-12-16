import React, { Component } from 'react';
import styles from './index.less';
import {
  Typography,
  Select,
  DatePicker,
  Upload,
  Icon,
  List,
  Button,
  notification,
  Spin,
} from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
import locale from 'antd/es/date-picker/locale/zh_CN';
import upload from '@/services/oss';
import moment from 'moment';
import { router } from 'umi';
import request from '@/utils/request';
const { Title } = Typography;
export default class AddJackPot extends Component {
  state = {};

  render() {
    return (
      <div className={styles.addJackPot}>
        <Title level={2}>新增活动奖池</Title>
        <div className={styles.addJackPotContent}>
          <Title level={4}>奖池配置</Title>
          <div className={styles.editorBox}>
            <div className={styles.editorTitle}>设置奖池名称</div>
            <div className={styles.editorItem}>111</div>
          </div>
          <div className={styles.editorBox}>
            <div className={styles.editorTitle}>设置奖池名称</div>
            <div className={styles.editorItem}>222</div>
          </div>
        </div>
      </div>
    );
  }
}
