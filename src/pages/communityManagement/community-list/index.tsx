import React, { Component } from 'react';
import styles from './index.less';
import { Breadcrumb, Row, Col, Form, Button, Select, Input, DatePicker} from 'antd';
const FormItem = Form.Item;
const { Option } = Select;


interface Props {
  form: any;
}

export default Form.create()(
  class AuditDetails extends Component<Props> {
    state = {

    }

    render() {
      const { getFieldDecorator } = this.props.form;

      return (
        <div className={styles.listPage}>
          <Breadcrumb>
            <Breadcrumb.Item>社群列表</Breadcrumb.Item>
          </Breadcrumb>
          <Form>
            <Row
              gutter={{
                md: 8,
                lg: 24,
                xl: 48,
              }}
            >
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
            </Row>
          </Form>
        </div>
      )
    }
  }

)
