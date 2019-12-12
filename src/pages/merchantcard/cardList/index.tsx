import React, { Component } from 'react';
import {
  Table,
  Button,
  Col,
  Divider,
  Form,
  Icon,
  Input,
  Row,
  Select,
  Modal,
  ConfigProvider,
} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { connect } from 'dva';
import styles from './index.less';
import router from 'umi/router';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

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
  {
    key: '8',
    num: '8',
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
    key: '9',
    num: '9',
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
    key: '10',
    num: '10',
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
    key: '11',
    num: '11',
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
    key: '12',
    num: '12',
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
    key: '13',
    num: '13',
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
    key: '14',
    num: '14',
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

interface Props {
  dispatch: (opt: any) => any;
  form: any;
  cardID: any;
  activityName: any;
  storeName: any;
  cardStatus: any;
  expandForm: Boolean;
  currentPage: Number;
  currentPageSize: Number;
  location: any;
}

export default Form.create()(
  connect(({ merchantCard }: any) => merchantCard)(
    class MerchantCard extends Component<Props> {
      state = {
        filteredInfo: {},
        sortedInfo: {},
        visible: false,
      };

      componentDidMount = async () => {
        /**
         * 判断 sessionStorage 有没 cardmanage
         * true -- 清除数据再重新请求列表数据
         */
        // const { dispatch } = this.props;
        // if (window.sessionStorage.getItem("cardmanage")) {
        //   await dispatch({
        //     type: "merchantCard/resetPageModel"
        //   })
        //   // 请求列表数据
        // }
      };

      // componentWillReceiveProps = async () => {
      //   const {
      //     location: {
      //       query: { go },
      //     },
      //     dispatch,
      //   } = this.props;
      //   if (go == 1) {
      //     console.log('alert');
      //     await dispatch({
      //       type: 'merchantCard/resetPageModel',
      //     });
      //   }
      // };

      handleChange = (pagination: any, filters: any, sorter: any) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.props.dispatch({
          type: 'merchantCard/setPaginationCurrent',
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

      handleSearch = (e: any) => {
        let cardID = this.props.form.getFieldValue('cardID');
        let storeName = this.props.form.getFieldValue('storeName');
        let activityName = this.props.form.getFieldValue('activityName');
        let cardStatus = this.props.form.getFieldValue('cardStatus');
        this.props.dispatch({
          type: 'merchantCard/setFussyForm',
          payload: {
            cardID,
            storeName,
            activityName,
            cardStatus,
          },
        });
        e.preventDefault();
      };

      handleReject = () => {
        this.setState({
          visible: true,
        });
      };

      handleFormReset = () => {
        const { form, dispatch } = this.props;
        dispatch({
          type: 'merchantCard/resetFussySearch',
        });
        form.resetFields();
      };

      toggleForm = () => {
        this.props.dispatch({
          type: 'merchantCard/switchExpandForm',
        });
      };

      renderAdvancedForm() {
        const {
          form: { getFieldDecorator },
        } = this.props;
        const { cardID, activityName, storeName, cardStatus } = this.props;
        return (
          <Form onSubmit={this.handleSearch} layout="inline" ref="fussy_search_form">
            <Row
              gutter={{
                md: 8,
                lg: 24,
                xl: 48,
              }}
            >
              <Col md={8} sm={24}>
                <FormItem label="卡券ID">
                  {getFieldDecorator('cardID', { initialValue: cardID })(
                    <Input placeholder="请输入" />,
                  )}
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
                <FormItem label="卡券状态">
                  {getFieldDecorator('cardStatus', { initialValue: cardStatus })(
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
        const { cardID, activityName } = this.props;
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
                  {getFieldDecorator('cardID', { initialValue: cardID })(
                    <Input placeholder="请输入" />,
                  )}
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

      renderForm() {
        const { expandForm } = this.props;
        return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
      }

      handleDetails = (record: any) => {
        console.log(record.card_id);
        router.push('/merchantcard/detail?id=' + record.card_id);
      };

      handleOk = (e: any) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      handleCancel = (e: any) => {
        console.log(e);
        this.setState({
          visible: false,
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
            render: (text: any, record: any) => (
              <span>
                <a onClick={this.handleDetails.bind(this, record)}>查看</a>
                <Divider type="vertical" />
                <a>通过</a>
                <Divider type="vertical" />
                <a onClick={this.handleReject.bind(this)}>拒绝</a>
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
                    return '共14条';
                  },
                  // onChange: (page:any,pageSize:any) => {
                  //   console.log('page',page);
                  //   console.log('pageSize',pageSize);
                  // }
                }}
              />
              <Modal
                title="请输入拒绝原因"
                centered
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
              >
                <TextArea rows={4} />
              </Modal>
            </div>
          </ConfigProvider>
        );
      }
    },
  ),
);
