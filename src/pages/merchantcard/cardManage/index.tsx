import React, { Component } from 'react';
import { Table, Button, Col, Form, Icon, Input, Row, Select, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { connect } from 'dva';
import styles from './index.less';
import router from 'umi/router';

const FormItem = Form.Item;
const { Option } = Select;

interface Props {
  dispatch: (opt: any) => any;
  form: any;
  ID: any;
  activityName: any;
  storeName: any;
  status: any;
  expandForm: Boolean;
  currentPage: Number;
  currentPageSize: Number;
}

const data = [
  {
    key: '1',
    num: '1',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '2',
    num: '2',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '3',
    num: '3',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '4',
    num: '4',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '5',
    num: '5',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '6',
    num: '6',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '7',
    num: '7',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '8',
    num: '8',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '9',
    num: '9',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '10',
    num: '10',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '11',
    num: '11',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '12',
    num: '12',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '13',
    num: '13',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '14',
    num: '14',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '15',
    num: '15',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '16',
    num: '16',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '17',
    num: '17',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '18',
    num: '18',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '19',
    num: '19',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
  {
    key: '20',
    num: '20',
    activityName: '2019双11鹰潭区域集卡抽奖',
    activityArea: '江西省鹰潭市',
    enlistTime: '2019.09.09至2019.09.29',
    activityStatus: '未生效',
  },
];

export default Form.create()(
  connect(({ cardManage }: any) => cardManage)(
    class CardManage extends Component<Props> {
      state = {
        filteredInfo: {},
        sortedInfo: {},
      };

      handleSearch = async (e: any) => {
        let ID = this.props.form.getFieldValue('ID');
        let storeName = this.props.form.getFieldValue('storeName');
        let activityName = this.props.form.getFieldValue('activityName');
        let status = this.props.form.getFieldValue('status');
        e.preventDefault();
        await this.props.dispatch({
          type: 'cardManage/setFussyForm',
          payload: {
            ID,
            storeName,
            activityName,
            status,
          },
        });
      };
      handleFormReset = async () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        await dispatch({
          type: 'cardManage/resetFussySearch',
        });
      };
      toggleForm = async () => {
        await this.props.dispatch({
          type: 'cardManage/switchExpandForm',
        });
      };

      renderForm() {
        const { expandForm } = this.props;
        return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
      }

      renderAdvancedForm() {
        const {
          form: { getFieldDecorator },
        } = this.props;
        const { ID, activityName, storeName, status } = this.props;
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
                <FormItem label="ID">
                  {getFieldDecorator('ID', { initialValue: ID })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="活动名称">
                  {getFieldDecorator('activityName', { initialValue: activityName })(
                    <Input placeholder="请输入" />,
                  )}
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
                  {getFieldDecorator('storeName', { initialValue: storeName })(
                    <Select
                      placeholder="请选择"
                      style={{
                        width: '100%',
                      }}
                    >
                      <Option value="0">关闭</Option>
                      <Option value="1">运行中</Option>
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="活动状态">
                  {getFieldDecorator('status', { initialValue: status })(
                    <Select
                      placeholder="请选择"
                      style={{
                        width: '100%',
                      }}
                    >
                      <Option value="0">关闭</Option>
                      <Option value="1">运行中</Option>
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
          </Form>
        );
      }

      renderSimpleForm() {
        const {
          form: { getFieldDecorator },
        } = this.props;
        const { ID, activityName } = this.props;
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
                <FormItem label="ID">
                  {getFieldDecorator('ID', { initialValue: ID })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="活动名称">
                  {getFieldDecorator('activityName', { initialValue: activityName })(
                    <Input placeholder="请输入" />,
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

      handleChange = (pagination: any, filters: any, sorter: any) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.props.dispatch({
          type: 'cardManage/setPaginationCurrent',
          payload: {
            currentPage: pagination.current,
            currentPageSize: pagination.pageSize,
          },
        });
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
      };

      handleCheckStoreActivity = (record: any) => {
        // console.log(record);
        router.push({
          pathname: '/merchantcard/cardList',
          query: {
            go: 1, // 是否为前进页面
          },
        });
      };

      render() {
        let { sortedInfo, filteredInfo } = this.state;
        const { currentPage, currentPageSize } = this.props;
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
            title: '活动名称',
            dataIndex: 'activityName',
            key: 'activityName',
            sorter: (a, b) => a.activityName.length - b.activityName.length,
            sortOrder: sortedInfo.columnKey === 'activityName' && sortedInfo.order,
            ellipsis: true,
          },
          {
            title: '招募时间',
            dataIndex: 'enlistTime',
            key: 'enlistTime',
            sorter: (a, b) => a.enlistTime.length - b.enlistTime.length,
            sortOrder: sortedInfo.columnKey === 'enlistTime' && sortedInfo.order,
            ellipsis: true,
          },
          {
            title: '活动状态',
            dataIndex: 'activityStatus',
            key: 'activityStatus',
            sorter: (a, b) => a.activityStatus.length - b.activityStatus.length,
            sortOrder: sortedInfo.columnKey === 'activityStatus' && sortedInfo.order,
            ellipsis: true,
          },
          {
            title: '操作',
            key: 'operation',
            width: 200,
            render: (text: any, record: any) => (
              <span>
                <a onClick={this.handleCheckStoreActivity.bind(this, record)}>查看商家活动</a>
              </span>
            ),
          },
        ];
        return (
          <ConfigProvider locale={zhCN}>
            <div>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <Table
                columns={columns}
                dataSource={data}
                onChange={this.handleChange}
                pagination={{
                  defaultPageSize: currentPageSize,
                  defaultCurrent: currentPage,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: () => {
                    return '共4条';
                  },
                }}
              />
            </div>
          </ConfigProvider>
        );
      }
    },
  ),
);
