import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Select, Table, } from 'antd'
import { connect } from "dva";
import styles from './index.less';
import request from '@/utils/request';
import moment from 'moment';
const FormItem = Form.Item;
const { Option } = Select;

interface Props {
    form: any;
    dispatch: (opt: any) => any;
    visitorMemberList: any
}

export default Form.create()(

    connect(({ visitorMemberList }: any) => ({ visitorMemberList }))(
        class visitorMemberList extends Component<Props> {

            state = {
                total: 0,
                loading: false,
                dataList: []
            }

            componentDidMount() {
                const {
                    mobile,
                    memberName,
                    memberStatus,
                    registerChannel,
                    currentPage,
                    currentPageSize
                } = this.props.visitorMemberList;

                this.getListData(mobile, memberName, memberStatus, registerChannel, currentPage, currentPageSize);
            }

            getListData = (mobile: any, memberName: any, memberStatus: any, registerChannel: any, currentPage: any, currentPageSize: any) => {
                this.setState({
                    loading: true
                })
                request('/api/v1/tourists', {
                    method: 'GET',
                    params: {
                        mobile,
                        user_name: memberName,
                        is_effect: memberStatus,
                        referer: registerChannel,
                        page: currentPage,
                        count: currentPageSize
                    }
                }).then(res => {
                    this.setState({
                        dataList: res.data,
                        loading: false,
                        total: res.pagination.total,
                    })
                })
            }

            onSearch = async (e: any) => {
                let mobile = this.props.form.getFieldValue('mobile');
                let memberName = this.props.form.getFieldValue('memberName');
                let memberStatus = this.props.form.getFieldValue('memberStatus');
                let registerChannel = this.props.form.getFieldValue('registerChannel');
                e.preventDefault();
                await this.props.dispatch({
                    type: 'visitorMemberList/setFussyForm',
                    payload: {
                        mobile,
                        memberName,
                        memberStatus,
                        registerChannel,
                    }
                })
                // console.log(this.props);
                const { currentPage, currentPageSize } = this.props.visitorMemberList;
                this.getListData(mobile, memberName, memberStatus, registerChannel, currentPage, currentPageSize);
            }

            handleFormReset = async () => {
                const { form, dispatch } = this.props;
                form.resetFields();
                await dispatch({
                    type: 'visitorMemberList/resetFussySearch',
                });
            }

            handleChange = async (pagination: any, filters: any, sorter: any) => {
                await this.props.dispatch({
                    type: 'visitorMemberList/setPaginationCurrent',
                    payload: {
                        currentPage: pagination.current,
                        currentPageSize: pagination.pageSize,
                    },
                });
                const { currentPage, currentPageSize } = this.props.visitorMemberList;
                let mobile = this.props.form.getFieldValue('mobile');
                let memberName = this.props.form.getFieldValue('memberName');
                let memberStatus = this.props.form.getFieldValue('memberStatus');
                let registerChannel = this.props.form.getFieldValue('registerChannel');
                this.getListData(mobile, memberName, memberStatus, registerChannel, currentPage, currentPageSize);
            };

            render() {
                const { getFieldDecorator } = this.props.form;
                const { mobile, memberName, memberStatus, registerChannel, currentPage, currentPageSize } = this.props.visitorMemberList;
                const { total, loading, dataList } = this.state;
                const columns = [
                    {
                        title: '编号',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: '会员名称',
                        dataIndex: 'user_name',
                        key: 'user_name',
                    },
                    {
                        title: '注册渠道',
                        dataIndex: 'source_channel',
                        key: 'source_channel',
                        render: (text: any, record: any) => (
                            <span>
                                {record.source_channel == "source_wx" ? "微信公众号" : record.source_channel == "source_xcx" ? "微信小程序" : record.source_channel == "source_ali" ? "支付宝" : ""}
                            </span>
                        )
                    },
                    {
                        title: '关联正式号',
                        dataIndex: 'associated_account',
                        key: 'associated_account',
                    },
                    {
                        title: '关联手机号',
                        dataIndex: 'mobile',
                        key: 'mobile',
                    },
                    {
                        title: '注册时间',
                        dataIndex: 'create_time',
                        key: 'create_time',
                        render: (text: any, record: any) => (
                            <span>{moment(record.create_time * 1000).format('YYYY-MM-DD')}</span>
                        )
                    },
                    {
                        title: '最后登录时间',
                        dataIndex: 'login_time',
                        key: 'login_time',
                        render: (text: any, record: any) => (
                            <span>{moment(record.login_time * 1000).format('YYYY-MM-DD')}</span>
                        )
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (text: any, record: any) => (
                            <span>
                                <a>编辑信息</a>
                            </span>
                        )
                    },
                ]
                return (
                    <div>
                        <div className={styles.tableListForm}>
                            <Form layout="inline" onSubmit={this.onSearch.bind(this)}>
                                <Row
                                    gutter={{
                                        md: 8,
                                        lg: 24,
                                        xl: 48,
                                    }}
                                >
                                    <Col md={8} sm={24}>
                                        <FormItem label='手机号码'>
                                            {getFieldDecorator('mobile', { initialValue: mobile })(
                                                <Input placeholder="请输入" />,
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col md={8} sm={24}>
                                        <FormItem label='会员名称'>
                                            {getFieldDecorator('memberName', { initialValue: memberName })(
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
                                        <FormItem label='会员状态' >
                                            {getFieldDecorator('memberStatus', { initialValue: memberStatus })(
                                                <Select placeholder="请选择会员状态" style={{ width: '100%' }}>
                                                    <Option value={1}>正常</Option>
                                                    <Option value={0}>冻结</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>

                                    <Col md={8} sm={24}>
                                        <FormItem label='注册渠道' >
                                            {getFieldDecorator('registerChannel', { initialValue: registerChannel })(
                                                <Select placeholder="请选择会员状态" style={{ width: '100%' }}>
                                                    <Option value={"source_xcx"}>微信小程序</Option>
                                                    <Option value={"source_wx"}>微信公众号</Option>
                                                    <Option value={"source_ali"}>支付宝</Option>
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
        }
    )
)