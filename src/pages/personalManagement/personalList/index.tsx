import React,{Component} from "react";
import styles from './index.less'
import request from '@/utils/request';
import { Row, Col, Form, Input, DatePicker, Button, Select, Table, Modal } from 'antd'
import {connect} from "dva";
const FormItem = Form.Item;
const { Option } = Select;
interface Props {
  form: any;
  dispatch: (opt: any) => any;
  containerTruckList: any;
  personalList: any
}
export default Form.create()(
  connect(({ personalList }: any) => ({ personalList }))(
class PersonalList extends Component<Props>{
  state = {

  }
  componentDidMount(): void {

  }

  onSearch = async (e: any) => {
  }

  handleFormReset = async () => {
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { currentPage, currentPageSize, name, mobile, status, type, start_date, end_date } = this.props.personalList
    return (
      <div>
        <Form onSubmit={this.onSearch} layout="inline">
          <Row
            gutter={{
              md: 8,
              lg: 24,
              xl: 48,
            }}
          >
            <Col md={5} sm={20}>
              <FormItem label='个人名称'>
                {getFieldDecorator('name', { initialValue: name })(
                  <Input placeholder="请输入" />,
                )}
              </FormItem>
            </Col>
            <Col md={5} sm={20}>
              <FormItem label='手机号'>
                {getFieldDecorator('mobile', { initialValue: mobile })(
                  <Input placeholder="请输入" />,
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label='入驻时间'>
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
            <Col md={5} sm={26}>
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
            </Col>

          </Row>
          <Row gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}>
            <Col md={5} sm={20}>
              <FormItem label='账户状态' style={{ width: '100%' }}>
                {getFieldDecorator('status', { initialValue: status })(
                  <Select placeholder="全部状态" style={{
                    width: '174px'
                  }}>
                    <Option value={1}>通过</Option>
                    <Option value={2}>拒绝</Option>
                    <Option value={3}>待审核</Option>
                    <Option value={4}>未提交</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={5} sm={20}>
              <FormItem label='类型'>
                {getFieldDecorator('type', { initialValue: type })(
                  <Select placeholder="全部类别" style={{
                    width: '174px'
                  }}>
                    <Option value={1}>创客</Option>
                    <Option value={2}>会长</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
))
