import React, { Component } from 'react';
import styles from './index.less';
import { Breadcrumb, Row, Col, Form, Button, Select, Input, DatePicker } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker, } = DatePicker;

interface Props {
  form: any;
}

export default Form.create()(
  class AuditDetails extends Component<Props> {
    state = {

    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const columns = [
        {
          title: '提交审核时间',
          dataIndex: 'created_at',
          key: 'created_at',
          width: 100
        }
      ]
      return (
        <div className={styles.listPage}>
          {/* <Breadcrumb>
            <Breadcrumb.Item>社群列表</Breadcrumb.Item>
          </Breadcrumb> */}
          <Form layout="inline">
            <Row
              gutter={{
                md: 8,
                lg: 24,
                xl: 48,
              }}
            >
              <Col md={8} sm={24}>
                <FormItem label='注册时间'>
                    <RangePicker />
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label='申请时间'>
                    <RangePicker />
                </FormItem>
              </Col>
              <Col md={6} sm={24}>
                <FormItem label='手机号'>
                    <Input />
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
              <Col md={6} sm={24}>
                <FormItem label='个人名称'>
                    <Input />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      )
    }
  }

)
