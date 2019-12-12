import React, { Component } from 'react';
import styles from './index.less';
import { Descriptions, Modal, Button, Radio, Icon, message, notification } from 'antd';
import request from '@/utils/request';
import { router } from 'umi';
export default class AddActivity extends Component {
  state = {
    visible: false,
    type: 1,
    closeVisible: false,
    confirmLoading: false,
    store: {
      supplier_id: 0,
      name: '',
      area_name: '',
      address: '',
      tel: '',
    },
    card: {
      name: '',
      youhui_type: 0,
      youhui_type_name: '',
      price: 0,
      total_num: 0,
      begin_time: 0,
      end_time: 0,
      description: [],
      image: '',
      create_time: '',
    },
  };
  //拒绝审批
  showCloseModal = () => {
    this.setState({ closeVisible: true });
  };
  handleOk = () => {
    this.setState({ confirmLoading: true });
    this.recruit(2);
    setTimeout(() => {
      this.setState({ closeVisible: false, confirmLoading: false });
    }, 1000);
  };
  handleCancel = () => {
    this.setState({ closeVisible: false });
  };
  //放大图片
  showModal = () => {
    this.setState({ visible: true });
  };
  hideModal = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    console.log(this.props.location.query.id);
    // let url = '/api/v1/activity/recruit/card/' + this.props.location.query.id;
    let url = '/api/v1/activity/recruit/card/1';
    request(url, { method: 'get' }).then(res => {
      console.log(res);
      if (res.status_code == 200) {
        this.setState({ store: res.data.store, card: res.data.card });
      } else {
        notification.open({ message: res.message });
        // setTimeout(() => {router.goBack();}, 1500);
      }
    });
  }
  recruit = (type: Number) => {
    // let url = '/api/v1/activity/recruit/card/' + this.props.location.query.id;
    let url = '/api/v1/activity/recruit/card/1';
    request(url, {
      method: 'get',
      data: { status: type },
    }).then(res => {
      console.log(res);
      if (res.status_code == 200) {
        console.log(res);
      } else {
        notification.open({ message: res.message });
      }
    });
  };

  render() {
    const { store, card } = this.state;
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
            <Descriptions.Item label="商家名称">{store.name}</Descriptions.Item>
            <Descriptions.Item label="所属区域">{store.area_name}</Descriptions.Item>
            <Descriptions.Item label="商家地址">{store.address}</Descriptions.Item>
            <Descriptions.Item label="商家电话"> {store.tel}</Descriptions.Item>
          </Descriptions>
        </div>
        {card.youhui_type == 0 ? (
          <div className={styles.detailPage}>
            <Descriptions
              title="卡券基本信息"
              layout="horizontal"
              column={1}
              size={'small'}
              bordered={true}
            >
              <Descriptions.Item label="卡券名称">{card.name}</Descriptions.Item>
              <Descriptions.Item label="发布时间">{card.create_time}</Descriptions.Item>
              <Descriptions.Item label="活动图片">
                <img
                  src={'http://oss.tdianyi.com/' + card.image}
                  onClick={this.showModal.bind(this, card.image)}
                />
              </Descriptions.Item>
              <Descriptions.Item label="卡券类型">{card.youhui_type_name}</Descriptions.Item>
              <Descriptions.Item label="商品原价"> {card.price}元</Descriptions.Item>
              <Descriptions.Item label="卡券有效期">
                {' '}
                {new Date(card.begin_time).getFullYear()}年
                {Number(new Date(card.begin_time).getMonth()) + 1}月
                {new Date(card.begin_time).getDate()}日至{new Date(card.end_time).getFullYear()}年
                {Number(new Date(card.end_time).getMonth()) + 1}月
                {new Date(card.end_time).getDate()}日
              </Descriptions.Item>
              <Descriptions.Item label="使用须知">
                <ul>
                  {card.description && card.description.length > 0
                    ? card.description.map((item, index) => {
                        return <li key={index}>{item}</li>;
                      })
                    : null}
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
              <Descriptions.Item label="卡券名称">{card.name}</Descriptions.Item>
              <Descriptions.Item label="发布时间">{card.create_time}</Descriptions.Item>
              <Descriptions.Item label="卡券类型">{card.youhui_type_name}</Descriptions.Item>
              <Descriptions.Item label="商品原价"> {card.price}元</Descriptions.Item>
              <Descriptions.Item label="卡券有效期">
                {' '}
                {new Date(card.begin_time).getFullYear()}年
                {Number(new Date(card.begin_time).getMonth()) + 1}月
                {new Date(card.begin_time).getDate()}日至{new Date(card.end_time).getFullYear()}年
                {Number(new Date(card.end_time).getMonth()) + 1}月
                {new Date(card.end_time).getDate()}日
              </Descriptions.Item>
              <Descriptions.Item label="卡券数量"> {card.total_num}张</Descriptions.Item>
            </Descriptions>
          </div>
        )}
        <div className={styles.buttonList}>
          <div className={styles.clickList}>
            <Button type="primary" size="large" onClick={this.recruit.bind(this, 1)}>
              审核通过
            </Button>
            <Button type="danger" size="large" onClick={this.showCloseModal}>
              拒绝通过
            </Button>
          </div>
          <Button
            size="large"
            onClick={() => {
              router.goBack();
            }}
          >
            {' '}
            取消
          </Button>
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
          <img src={'http://oss.tdianyi.com/' + card.image} />
        </Modal>
        <Modal
          title="拒绝审批"
          visible={this.state.closeVisible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          确定拒绝审批吗？
        </Modal>
      </div>
    );
  }
}
