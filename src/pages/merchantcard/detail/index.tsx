import React, { Component } from 'react';
import styles from './index.less';
import { Descriptions, Modal, Button, Radio, Icon } from 'antd';
import { createRequire } from 'module';
import Request from '@/utils/request';
export default class AddActivity extends Component {
  state = {
    visible: false,
    type: 1,
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  componentDidMount() {
    // Request(
    //   url:'api/v1/activity/recruit/card/[:id]'
    // )
  }
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
        {this.state.type == 1 ? (
          <div className={styles.detailPage}>
            <Descriptions
              title="卡券基本信息"
              layout="horizontal"
              column={1}
              size={'small'}
              bordered={true}
            >
              <Descriptions.Item label="卡券名称">这是一个慕斯蛋糕券</Descriptions.Item>
              <Descriptions.Item label="发布时间">2019-10-10 15:30:45</Descriptions.Item>
              <Descriptions.Item label="活动图片">
                <img src={require('./timg.jpg')} onClick={this.showModal} />
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
        ) : (
          <div className={styles.detailPage}>
            <Descriptions
              title="卡券基本信息"
              layout="horizontal"
              column={1}
              size={'small'}
              bordered={true}
            >
              <Descriptions.Item label="卡券名称">50元代金券</Descriptions.Item>
              <Descriptions.Item label="发布时间">2019-10-10 15:30:45</Descriptions.Item>
              <Descriptions.Item label="卡券类型">现金券</Descriptions.Item>
              <Descriptions.Item label="商品原价"> 99元</Descriptions.Item>
              <Descriptions.Item label="卡券有效期"> 至2019年12月31日</Descriptions.Item>
              <Descriptions.Item label="卡券数量"> 1000张</Descriptions.Item>
            </Descriptions>
          </div>
        )}
        <div className={styles.buttonList}>
          <div className={styles.clickList}>
            <Button type="primary" size="large">
              审核通过
            </Button>
            <Button type="danger" size="large">
              拒绝通过
            </Button>
          </div>
          <Button size="large"> 取消</Button>
        </div>

        <Modal
          title="活动图片"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          centered
          destroyOnClose
          width={'auto'}
          footer={null}
        >
          <img src={require('./timg.jpg')} />
        </Modal>
      </div>
    );
  }
}
