import React, { Component } from 'react';
import styles from './index.less';
import { Descriptions, Button, Radio, Icon } from 'antd';
import { createRequire } from 'module';

export default class AddActivity extends Component {
  state = {};

  render() {
    return (
      <div className={styles.detail}>
        <div className={styles.detailPage}>
          <Descriptions
            title="商家基本信息"
            layout="horizontal"
            column={1}
            size={'small'}
            bordered={true}
          >
            <Descriptions.Item label="商家名称">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="所属区域">Hangzhou</Descriptions.Item>
            <Descriptions.Item label="商家地址">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="商家电话"> 13577778888</Descriptions.Item>
          </Descriptions>
        </div>
        <div className={styles.detailPage}>
          <Descriptions
            title="卡券基本信息"
            layout="horizontal"
            column={1}
            size={'small'}
            bordered={true}
          >
            <Descriptions.Item label="卡券名称">这是一个慕斯蛋糕券</Descriptions.Item>
            <Descriptions.Item label="活动时间">2019-10-10 15:30:45</Descriptions.Item>
            <Descriptions.Item label="活动图片">
              <img src={require('./timg.jpg')} />
            </Descriptions.Item>
            <Descriptions.Item label="卡券类型">兑换券</Descriptions.Item>
            <Descriptions.Item label="商品原价"> 99元</Descriptions.Item>
            <Descriptions.Item label="卡券有效期"> 至2019年12月31日</Descriptions.Item>
            <Descriptions.Item label="使用须知">
              <ul>
                <li>1111111111111</li>
                <li>2222222222222</li>
                <li>3333333333333</li>
              </ul>
            </Descriptions.Item>
          </Descriptions>
        </div>
        <Button type="primary" size="large">
          {' '}
          Primary
        </Button>
        <Button type="danger" size="large">
          {' '}
          Primary
        </Button>
        {/* <Button type="Normal" size="large"> Primary</Button> */}
      </div>
    );
  }
}
