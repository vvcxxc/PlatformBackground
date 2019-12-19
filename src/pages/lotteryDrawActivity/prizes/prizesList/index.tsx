import React, { Component } from 'react';
import {
  Table,
  Button,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Select,
  ConfigProvider,
  Divider,
  notification,
  Modal,
} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { connect } from 'dva';
import styles from './index.less';
import router from 'umi/router';
import request from '@/utils/request';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

interface Props {
  form: any;
  dispatch: (opt: any) => any;
  prizesList: any;
}

export default Form.create()(
  connect(({ prizesList }: any) => ({ prizesList }))(
    class PrizesList extends Component<Props> {
      state = {
        dataList: [],
        loading: false,
        total: 0,
        visible: false,
      };

      componentDidMount() {
        console.log(this.props);
      }

      handleSearch = async (e: any) => {
        let activityStatus = this.props.form.getFieldValue('activityStatus');
        let prizeName = this.props.form.getFieldValue('prizeName');
        e.preventDefault();
        await this.props.dispatch({
          type: 'prizesList/setFussyForm',
          payload: {
            activityStatus,
            prizeName,
          },
        });

        const { currentPage, currentPageSize } = this.props.prizesList;

        // this.getListData(activityName, activityStatus, status, currentPage, currentPageSize);
      };

      handleFormReset = async () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        await dispatch({
          type: 'prizesList/resetFussySearch',
        });
      };

      renderForm() {
        return this.renderSimpleForm();
      }

      renderSimpleForm() {
        const {
          form: { getFieldDecorator },
        } = this.props;
        const { prizeName, activityStatus } = this.props.prizesList;
        return (
          <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
            <Row
              gutter={{
                md: 8,
                lg: 24,
                xl: 48,
              }}
            >
              <Col md={8} sm={24}>
                <FormItem label="活动名称">
                  {getFieldDecorator('prizeName', { initialValue: prizeName })(
                    <Input placeholder="请输入" />,
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="活动状态">
                  {getFieldDecorator('activityStatus', { initialValue: activityStatus })(
                    <Select
                      placeholder="请选择"
                      style={{
                        width: '100%',
                      }}
                    >
                      <Option value="0">未生效</Option>
                      <Option value="1">招募中</Option>
                      <Option value="2">已结束</Option>
                    </Select>,
                  )}
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
                </span>
              </Col>
            </Row>
          </Form>
        );
      }

      addActivity = () => {
        this.setState({
          visible: true,
        });
      };

      handleOk = () => {};

      handleCancel = () => {
        this.setState({
          visible: false,
        });
      };

      render() {
        const { visible } = this.state;
        return (
          <div>
            <Modal
              title="Basic Modal"
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Button
              type="primary"
              icon="plus"
              className={styles.addActivity}
              onClick={this.addActivity}
            >
              添加奖品
            </Button>
          </div>
        );
      }
    },
  ),
);
