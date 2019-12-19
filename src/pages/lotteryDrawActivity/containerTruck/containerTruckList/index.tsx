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
  containerTruckList: any;
}

export default Form.create()(
  connect(({ containerTruckList }: any) => ({ containerTruckList }))(
    class ContainerTruckList extends Component<Props> {
      state = {
        dataList: [],
        areaList: [],
        loading: false,
        total: 0,
      };

      componentDidMount() {
        console.log(this.props);

        this.getAreaList();
      }

      getAreaList = () => {
        request('/api/common/area', {
          method: 'GET',
        }).then(res => {
          this.setState({
            areaList: res.data,
          });
        });
      };

      handleSearch = async (e: any) => {
        let storeName = this.props.form.getFieldValue('storeName');
        let activityName = this.props.form.getFieldValue('activityName');
        let status = this.props.form.getFieldValue('status');
        e.preventDefault();
        await this.props.dispatch({
          type: 'containerTruckList/setFussyForm',
          payload: {
            storeName,
            activityName,
            status,
          },
        });

        const { currentPage, currentPageSize } = this.props.containerTruckList;

        // this.getListData(activityName, storeName, status, currentPage, currentPageSize);
      };

      handleFormReset = async () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        await dispatch({
          type: 'containerTruckList/resetFussySearch',
        });
      };

      toggleForm = async () => {
        await this.props.dispatch({
          type: 'containerTruckList/switchExpandForm',
        });
      };

      renderForm() {
        const { expandForm } = this.props.containerTruckList;
        return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
      }

      renderAdvancedForm() {
        const {
          form: { getFieldDecorator },
        } = this.props;
        const { activityName, storeName, status } = this.props.containerTruckList;
        const { areaList } = this.state;
        return (
          <Form onSubmit={this.handleSearch.bind(this)} layout="inline" ref="fussy_search_form">
            <Row
              gutter={{
                md: 8,
                lg: 24,
                xl: 48,
              }}
            >
              <Col md={8} sm={24}>
                <FormItem label="活动名称">
                  {getFieldDecorator('activityName', { initialValue: activityName })(
                    <Input placeholder="请输入" />,
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="商圈名称">
                  {getFieldDecorator('storeName', { initialValue: storeName })(
                    <Select
                      placeholder="请选择"
                      style={{
                        width: '100%',
                      }}
                    >
                      {areaList.map((item: any) => (
                        <Option value={item.id}>{item.name}</Option>
                      ))}
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
            <Row
              gutter={{
                md: 8,
                lg: 24,
                xl: 48,
              }}
            >
              <Col md={8} sm={24}>
                <FormItem label="活动状态">
                  {getFieldDecorator('status', { initialValue: status })(
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
            </Row>
          </Form>
        );
      }

      renderSimpleForm() {
        const {
          form: { getFieldDecorator },
        } = this.props;
        const { activityName, storeName } = this.props.containerTruckList;
        const { areaList } = this.state;
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
                  {getFieldDecorator('activityName', { initialValue: activityName })(
                    <Input placeholder="请输入" />,
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="商圈名称">
                  {getFieldDecorator('storeName', { initialValue: storeName })(
                    <Select
                      placeholder="请选择"
                      style={{
                        width: '100%',
                      }}
                    >
                      {areaList.map((item: any) => (
                        <Option value={item.id}>{item.name}</Option>
                      ))}
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

      render() {
        return (
          <div>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
          </div>
        );
      }
    },
  ),
);
