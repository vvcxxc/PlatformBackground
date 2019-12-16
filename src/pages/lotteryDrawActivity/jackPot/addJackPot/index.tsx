import React, { Component } from 'react';
import styles from './index.less';
import {
  Typography,
  Select,
  DatePicker,
  Input,
  Menu,
  Dropdown,
  Descriptions,
  Button,
  Icon,
  message,
  Table,
  Divider,
  Tag,
} from 'antd';
import { router } from 'umi';
import request from '@/utils/request';
const { Title } = Typography;
export default class AddJackPot extends Component {
  state = {
    menuCheck: undefined,
    activityCheck: undefined,
    dataSource: [
      {
        key: '1',
        number: '1',
        giftId: 'PC9527',
        name: '谢谢参与',
      },
      {
        key: '2',
        number: '2',
        giftId: 'PC9528',
        name: '华为P30',
      },
      {
        key: '3',
        number: '3',
        giftId: 'PC9529',
        name: '小米充电宝',
      },
    ],
  };
  handleMenuClick = (type: Number, e: any) => {
    this.setState({ menuCheck: type });
  };
  handleActiviutyClick = (Name: String, e: any) => {
    this.setState({ activityCheck: Name });
  };
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.handleMenuClick.bind(this, 1)}>
          线上卡券
        </Menu.Item>
        <Menu.Item key="2" onClick={this.handleMenuClick.bind(this, 2)}>
          实物奖品
        </Menu.Item>
      </Menu>
    );
    const activiuty = (
      <Menu>
        {/* 这个Menu.Item麻烦遍历出来*/}
        <Menu.Item key="1" onClick={this.handleActiviutyClick.bind(this, '活动1')}>
          活动1
        </Menu.Item>
        <Menu.Item key="2" onClick={this.handleActiviutyClick.bind(this, '活动2')}>
          活动2
        </Menu.Item>
        <Menu.Item key="2" onClick={this.handleActiviutyClick.bind(this, '活动2')}>
          活动3
        </Menu.Item>
      </Menu>
    );
    const columns = [
      {
        title: '编号',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: '礼品ID',
        dataIndex: 'giftId',
        key: 'giftId',
      },
      {
        title: '礼品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '中奖率',
        dataIndex: 'percent',
        render: () => (
          <div>
            <Input className={styles.inputBox} placeholder="设置中奖率" />%
          </div>
        ),
      },
    ];

    return (
      <div className={styles.addJackPot}>
        <Title level={2}>新增活动奖池</Title>
        <div className={styles.addJackPotContent}>
          <Descriptions
            title="奖池配置"
            layout="horizontal"
            column={1}
            size={'small'}
            bordered={true}
          >
            <Descriptions.Item label="设置奖池名称">
              <Input placeholder="请设置奖池名称" />
            </Descriptions.Item>
            <Descriptions.Item label="选择奖品类型">
              <Dropdown.Button overlay={menu}>
                {!this.state.menuCheck
                  ? '选择奖品类型'
                  : this.state.menuCheck == 1
                  ? '线上卡券'
                  : '实物奖品'}
              </Dropdown.Button>
            </Descriptions.Item>
            {this.state.menuCheck == 1 ? (
              <Descriptions.Item label="选择关联营销活动">
                <Dropdown.Button overlay={activiuty}>
                  {!this.state.activityCheck ? '选择奖品类型' : this.state.activityCheck}
                </Dropdown.Button>
              </Descriptions.Item>
            ) : null}
          </Descriptions>
        </div>
        {this.state.menuCheck == 1 ? (
          <div className={styles.addJackPotContent}>
            <Descriptions
              title="奖品子奖池（卡券）"
              layout="horizontal"
              column={1}
              size={'small'}
              bordered={true}
            >
              <Descriptions.Item label="关联活动">
                {!this.state.activityCheck ? '未选择奖品类型' : this.state.activityCheck}
              </Descriptions.Item>
              <Descriptions.Item label="设置奖池名称">已设置XX张 </Descriptions.Item>
              <Descriptions.Item label="谢谢参与中奖率">
                <Input className={styles.inputBox} placeholder="请设置谢谢参与中奖率" />
              </Descriptions.Item>
              <Descriptions.Item label="每日卡券库存">
                <Input className={styles.inputBox} placeholder="请设置每日卡券库存" />张
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : null}
        {this.state.menuCheck == 2 ? (
          <div className={styles.addJackPotContent}>
            <Descriptions
              title="奖品子奖池（实物）"
              layout="horizontal"
              column={1}
              size={'small'}
              bordered={true}
            >
              <Descriptions.Item label="领取地点">
                <Input className={styles.inputBox} placeholder="请设置领取地点" />
              </Descriptions.Item>
              <Descriptions.Item label="领取地址">
                <Input placeholder="请设置领取地址" />
              </Descriptions.Item>
              <Descriptions.Item label="领取有效期">
                领券后
                <Input className={styles.inputBox} placeholder="领取有效期" />
                天有效
              </Descriptions.Item>
              <Descriptions.Item label="奖品数量">已选择X份</Descriptions.Item>
              <Descriptions.Item label="选择实物">
                <Button type="link">点击选择卡券</Button>
              </Descriptions.Item>
              <Descriptions.Item label="设定奖品中奖率">
                <Table dataSource={this.state.dataSource} columns={columns} pagination={false} />
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : null}
        <div className={styles.buttonList}>
          <Button type="primary" className={styles.btn}>
            提交
          </Button>
          <Button className={styles.btn}>取消</Button>
        </div>
      </div>
    );
  }
}
