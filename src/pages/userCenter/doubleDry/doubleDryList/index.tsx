import React, { Component } from 'react'
import { Row, Col, Form, Input, DatePicker, Button, Select, Table, } from 'antd'
import { connect } from "dva";
import moment from "moment";
import styles from './index.less'
import request from '@/utils/request';
import { router } from 'umi';
const FormItem = Form.Item;
const { Option } = Select;


interface Props {
  form: any;
  dispatch: (opt: any) => any;
  doubleDryList: any
}
export default Form.create()(
  connect(({ doubleDryList }: any) => ({ doubleDryList }))(
    class doubleDryList extends Component<Props> {
      state = {
        loading: false,
        dataList: [],
        total: 0
      }

      componentDidMount() {
        const {
          start_date_moment,
          end_date_moment,
          mobile,
          categoryType,
          doubledryStatus,
          currentPage,
          currentPageSize,
        } = this.props.doubleDryList;
        this.getListData(start_date_moment, end_date_moment, mobile, categoryType, doubledryStatus, currentPage, currentPageSize);
      }

      getListData = (start_time: string, end_time: string, phone: string, channel: any, status: string, currentPage: any, currentPageSize: any) => {
        this.setState({
          loading: true,
        });
        request('/api/v1/user_centre/sq_examine', {
          method: 'GET',
          params: {
            start_time,
            end_time,
            status,
            phone,
            channel,
            page: currentPage,
            count: currentPageSize
          }
        }).then((res: any) => {
          this.setState({
            dataList: res.data,
            loading: false,
            total: res.pagination.total,
          })
        })
      }

      handleFormReset = async () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        await dispatch({
          type: 'doubleDryList/resetFussySearch',
        });
      };

      onSearch = async (e: any) => {
        let start_date = this.props.form.getFieldValue('start_date');
        let end_date = this.props.form.getFieldValue('end_date');
        let mobile = this.props.form.getFieldValue('mobile');
        let categoryType = this.props.form.getFieldValue('categoryType');
        let doubledryStatus = this.props.form.getFieldValue('doubledryStatus');
        e.preventDefault();
        await this.props.dispatch({
          type: 'doubleDryList/setFussyForm',
          payload: {
            start_date,
            end_date,
            mobile,
            categoryType,
            doubledryStatus,
          }
        })
        const { currentPage, currentPageSize, start_date_moment, end_date_moment } = this.props.doubleDryList;
        this.getListData(start_date_moment, end_date_moment, mobile, categoryType, doubledryStatus, currentPage, currentPageSize);
      }


      handleChange = async (pagination: any, filters: any, sorter: any) => {
        await this.props.dispatch({
          type: 'doubleDryList/setPaginationCurrent',
          payload: {
            currentPage: pagination.current,
            currentPageSize: pagination.pageSize,
          },
        });
        // let start_date = this.props.form.getFieldValue('start_date');
        // let end_date = this.props.form.getFieldValue('end_date');
        let mobile = this.props.form.getFieldValue('mobile');
        let categoryType = this.props.form.getFieldValue('categoryType');
        let doubledryStatus = this.props.form.getFieldValue('doubledryStatus');
        const { currentPage, currentPageSize, start_date_moment, end_date_moment } = this.props.doubleDryList;
        this.getListData(start_date_moment, end_date_moment, mobile, categoryType, doubledryStatus, currentPage, currentPageSize);
      };

      render() {
        const columns = [
          {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
            // width: 160
          },
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            // width: 160
          },
          {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            // width: 160
          },
          {
            title: '注册角色',
            dataIndex: 'channel_id',
            key: 'channel_id',
            // width: 160
          },
          {
            title: '双乾状态',
            dataIndex: 'status',
            key: 'status',
            // width: 160
          },
          {
            title: '绑卡状态',
            dataIndex: 'bind_card_status',
            key: 'bind_card_status',
            // width: 160 
          },
          {
            title: '开通转账状态',
            dataIndex: 'opening_status',
            key: 'opening_status',
            // width: 160
          },
          {
            title: '操作',
            key: 'operation',
            width: 200,
            render: (text:any,record: any) => (
              <span>
                <a onClick={()=> router.push(`/userCenter/doubleDry/pay-details?phone=${record.phone}&channel_id=${record.channel_id}`)}>查看支付</a>
              </span>
            )
          }
        ]
        const { getFieldDecorator } = this.props.form;
        const { start_date, end_date, mobile, categoryType, doubledryStatus, currentPage, currentPageSize } = this.props.doubleDryList;
        const { loading, dataList, total } = this.state;
        return (
          <div>
            <div className={styles.tableListForm}>
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

                      {getFieldDecorator('start_date', { initialValue: start_date })(
                        <DatePicker />
                      )}

                      <span style={{ margin: "0 30px" }}>-</span>

                      {getFieldDecorator('end_date', { initialValue: end_date })(
                        <DatePicker />
                      )}

                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
                    <FormItem label='手机号'>
                      {getFieldDecorator('mobile', { initialValue: mobile })(
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
                  }}>
                  <Col md={8} sm={24}>
                    <FormItem label='角色类型' >
                      {getFieldDecorator('categoryType', { initialValue: categoryType })(
                        <Select placeholder="全部状态" style={{ width: '100%' }}>
                          <Option value={10000}>商家</Option>
                          <Option value={20000}>创客</Option>
                          {/* <Option value={3}>会长</Option> */}
                          <Option value={30000}>代理商</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
                    <FormItem label='双乾状态'>
                      {getFieldDecorator('doubledryStatus', { initialValue: doubledryStatus })(
                        <Select placeholder="全部状态" style={{ width: '100%' }}>
                          <Option value={4}>未提交</Option>
                          <Option value={3}>已提交</Option>
                          <Option value={2}>未认证</Option>
                          <Option value={1}>已认证</Option>
                          <Option value={0}>认证失败</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>

                  <Col md={8} sm={24}>
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

            <Table
              columns={columns}
              dataSource={dataList}
              loading={loading}
              onChange={this.handleChange}
              pagination={{
                current: currentPage,
                defaultPageSize: currentPageSize,
                showSizeChanger: true,
                showQuickJumper: true,
                total,
                showTotal: () => {
                  return `共${total}条`;
                },
              }}
            />

          </div>
        )
      }
    }))
