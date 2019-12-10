import React, { Component } from 'react';
import { Table, Button, Col, Divider, Form, Icon, Input, InputNumber, Row, Select } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;

const data = [
  {
    key: '1',
    num: '1',
    card_id: 'PC9527',
    store_name: '多美蛋糕店',
    address: '广东省广州市',
    telphone: 13666666666,
    card_time: '2019-10-10 15:30:30',
    card_type: '现金券',
    card_name: '50元代金券',
    store_price: '50元',
    card_status: '未审核',
    card_num: 1000,
  },
  {
    key: '2',
    num: '2',
    card_id: 'PC9527',
    store_name: '多美蛋糕店',
    address: '广东省广州市',
    telphone: 13666666666,
    card_time: '2019-10-10 15:30:30',
    card_type: '现金券',
    card_name: '50元代金券',
    store_price: '50元',
    card_status: '未审核',
    card_num: 1000,
  },
  {
    key: '3',
    num: '3',
    card_id: 'PC9527',
    store_name: '多美蛋糕店',
    address: '广东省广州市',
    telphone: 13666666666,
    card_time: '2019-10-10 15:30:30',
    card_type: '现金券',
    card_name: '50元代金券',
    store_price: '50元',
    card_status: '未审核',
    card_num: 1000,
  },
  {
    key: '4',
    num: '4',
    card_id: 'PC9527',
    store_name: '多美蛋糕店',
    address: '广东省广州市',
    telphone: 13666666666,
    card_time: '2019-10-10 15:30:30',
    card_type: '现金券',
    card_name: '50元代金券',
    store_price: '50元',
    card_status: '未审核',
    card_num: 1000,
  },
  {
    key: '5',
    num: '5',
    card_id: 'PC9527',
    store_name: '多美蛋糕店',
    address: '广东省广州市',
    telphone: 13666666666,
    card_time: '2019-10-10 15:30:30',
    card_type: '现金券',
    card_name: '50元代金券',
    store_price: '50元',
    card_status: '未审核',
    card_num: 1000,
  },
  {
    key: '6',
    num: '6',
    card_id: 'PC9527',
    store_name: '多美蛋糕店',
    address: '广东省广州市',
    telphone: 13666666666,
    card_time: '2019-10-10 15:30:30',
    card_type: '现金券',
    card_name: '50元代金券',
    store_price: '50元',
    card_status: '未审核',
    card_num: 1000,
  },
  {
    key: '7',
    num: '7',
    card_id: 'PC9527',
    store_name: '多美蛋糕店',
    address: '广东省广州市',
    telphone: 13666666666,
    card_time: '2019-10-10 15:30:30',
    card_type: '现金券',
    card_name: '50元代金券',
    store_price: '50元',
    card_status: '未审核',
    card_num: 1000,
  },
];

class MerchantCard extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    expandForm: false,
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  handleSearch = e => {
    e.preventDefault();
  };

  handleFormReset = () => {};

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  renderAdvancedForm() {
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="卡券ID">
              <Input placeholder="请输入" />
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="活动名称">
              <InputNumber
                style={{
                  width: '100%',
                }}
              />
            </FormItem>
          </Col>
        </Row>
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="商家名称">
              <Select
                placeholder="请选择"
                style={{
                  width: '100%',
                }}
              >
                <Option value="0">关闭</Option>
                <Option value="1">运行中</Option>
              </Select>
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="卡券状态">
              <Select
                placeholder="请选择"
                style={{
                  width: '100%',
                }}
              >
                <Option value="0">关闭</Option>
                <Option value="1">运行中</Option>
              </Select>
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset}
              >
                重置
              </Button>
              <a
                style={{
                  marginLeft: 8,
                }}
                onClick={this.toggleForm}
              >
                收起 <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
  renderSimpleForm() {
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="卡券ID">
              <Input placeholder="请输入" />
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="活动名称">
              <InputNumber
                style={{
                  width: '100%',
                }}
              />
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset}
              >
                重置
              </Button>
              <a
                style={{
                  marginLeft: 8,
                }}
                onClick={this.toggleForm}
              >
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  handleDetails = record => {
    console.log(record);
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: '编号',
        dataIndex: 'num',
        key: 'num',
        sorter: (a, b) => a.num.length - b.num.length,
        sortOrder: sortedInfo.columnKey === 'num' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '卡券ID',
        dataIndex: 'card_id',
        key: 'card_id',
        sorter: (a, b) => a.card_id - b.card_id,
        sortOrder: sortedInfo.columnKey === 'card_id' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '商户名称',
        dataIndex: 'store_name',
        key: 'store_name',
        sorter: (a, b) => a.store_name.length - b.store_name.length,
        sortOrder: sortedInfo.columnKey === 'store_name' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '所属商圈',
        dataIndex: 'address',
        key: 'address',
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '联系电话',
        dataIndex: 'telphone',
        key: 'telphone',
        sorter: (a, b) => a.telphone.length - b.telphone.length,
        sortOrder: sortedInfo.columnKey === 'telphone' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '发券时间',
        dataIndex: 'card_time',
        key: 'card_time',
        sorter: (a, b) => a.card_time.length - b.card_time.length,
        sortOrder: sortedInfo.columnKey === 'card_time' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '卡券类型',
        dataIndex: 'card_type',
        key: 'card_type',
        sorter: (a, b) => a.card_type.length - b.card_type.length,
        sortOrder: sortedInfo.columnKey === 'card_type' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '商品价值',
        dataIndex: 'store_price',
        key: 'store_price',
        sorter: (a, b) => a.store_price.length - b.store_price.length,
        sortOrder: sortedInfo.columnKey === 'store_price' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '卡券状态',
        dataIndex: 'card_status',
        key: 'card_status',
        sorter: (a, b) => a.card_status.length - b.card_status.length,
        sortOrder: sortedInfo.columnKey === 'card_status' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '数量',
        dataIndex: 'card_num',
        key: 'card_num',
        sorter: (a, b) => a.card_num.length - b.card_num.length,
        sortOrder: sortedInfo.columnKey === 'card_num' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '操作',
        key: 'operation',
        width: 200,
        render: (text, record) => (
          <span>
            <a onClick={this.handleDetails.bind(this, record)}>查看</a>
            <Divider type="vertical" />
            <a>通过</a>
            <Divider type="vertical" />
            <a>拒绝</a>
          </span>
        ),
      },
    ];
    return (
      <div>
        <div className={styles.tableListForm}>{this.renderForm()}</div>
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          pagination={{ defaultPageSize: 3 }}
        />
      </div>
    );
  }
}

export default MerchantCard;
