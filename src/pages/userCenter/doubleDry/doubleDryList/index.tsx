import React, { Component } from 'react'
import { Row, Col, Form, Input, DatePicker, Button, Select, Table, } from 'antd'
import { connect } from "dva";
import moment from "moment";
import styles from './index.less'
const FormItem = Form.Item;
const { Option } = Select;

interface Props {
  form: any;
  dispatch: (opt: any) => any;
  containerTruckList: any;
  personalList: any
}
export default Form.create()(
  connect(({ doubleDryList }: any) => ({ doubleDryList }))(
class doubleDryList extends Component<Props> {
  state = {

  }

  handleFormReset = async () => {

  };

  onSearch = async (e: any) => {

  }


  handleChange = async () => {

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { currentPage, currentPageSize, name, mobile, status, type, start_date, end_date } = this.props.doubleDryList;
    return (
      <div>
        <Form onSubmit={this.onSearch.bind(this)} layout="inline">
          <Row
            gutter={{
              md: 8,
              lg: 24,
              xl: 48,
            }}
          >
            <Col md={8} sm={24}>
              <FormItem label='创建时间'>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(40% - 12px)' }}
                >
                  {/* <DatePicker /> */}
                  {getFieldDecorator('start_date', { initialValue: start_date })(
                    <DatePicker />
                  )}
                </Form.Item>
                <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                <Form.Item style={{ display: 'inline-block', width: 'calc(40% - 12px)' }}>
                  {/* <DatePicker /> */}
                  {getFieldDecorator('end_date', { initialValue: end_date })(
                    <DatePicker />
                  )}
                </Form.Item>
              </FormItem>
            </Col>
            <Col md={5} sm={10}>
              <FormItem label='手机号'>
                {getFieldDecorator('mobile', { initialValue: mobile })(
                  <Input placeholder="请输入" />,
                )}
              </FormItem>
            </Col>
            <Col md={5} sm={10}>
              <FormItem label='角色类型' style={{ width: '100%' }}>
                {getFieldDecorator('status', { initialValue: status })(
                  <Select placeholder="全部状态" style={{
                    width: '174px'
                  }}>
                    <Option value={1}>商家</Option>
                    <Option value={2}>创客</Option>
                    <Option value={3}>会长</Option>
                    <Option value={4}>代理</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={5} sm={10}>
              <FormItem label='双乾状态' style={{ width: '100%' }}>
                {getFieldDecorator('status', { initialValue: status })(
                  <Select placeholder="全部状态" style={{
                    width: '174px'
                  }}>
                    <Option value={1}>未提交</Option>
                    <Option value={2}>已提交</Option>
                    <Option value={3}>未认证</Option>
                    <Option value={4}>已认证</Option>
                    <Option value={5}>认证失败</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col md={5} sm={26}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset}
              >
                重置
              </Button>
            </Col>

          </Row>
        </Form>
      </div>
    )
  }
}))
