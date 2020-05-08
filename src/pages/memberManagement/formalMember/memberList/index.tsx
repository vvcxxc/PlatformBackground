import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Select, Table, Divider, } from 'antd'
import { connect } from "dva";
import styles from './index.less';
import request from '@/utils/request';
import moment from 'moment';
import { router } from 'umi';
const FormItem = Form.Item;
const { Option } = Select;

interface Props {
    form: any;
    dispatch: (opt: any) => any;
    FormalMemberList: any
}

export default Form.create()(

    connect(({ FormalMemberList }: any) => ({ FormalMemberList }))(
        class FormalMemberList extends Component<Props> {

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
                    currentPage,
                    currentPageSize
                } = this.props.FormalMemberList;

                this.getListData(mobile, memberName, memberStatus, currentPage, currentPageSize);
            }

            getListData = (mobile: any, memberName: any, memberStatus: any, currentPage: any, currentPageSize: any) => {
                this.setState({
                    loading: true
                })
                request('/api/v1/users', {
                    method: 'GET',
                    params: {
                        mobile,
                        user_name: memberName,
                        is_effect: memberStatus,
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
                e.preventDefault();
                await this.props.dispatch({
                    type: 'FormalMemberList/setFussyForm',
                    payload: {
                        mobile,
                        memberName,
                        memberStatus,
                    }
                })
                const { currentPage, currentPageSize } = this.props.FormalMemberList;
                this.getListData(mobile, memberName, memberStatus, currentPage, currentPageSize);
            }

            handleFormReset = async () => {
                const { form, dispatch } = this.props;
                form.resetFields();
                await dispatch({
                    type: 'FormalMemberList/resetFussySearch',
                });
            }

            handleChange = async (pagination: any, filters: any, sorter: any) => {
                await this.props.dispatch({
                    type: 'FormalMemberList/setPaginationCurrent',
                    payload: {
                        currentPage: pagination.current,
                        currentPageSize: pagination.pageSize,
                    },
                });
                const { currentPage, currentPageSize } = this.props.FormalMemberList;
                let mobile = this.props.form.getFieldValue('mobile');
                let memberName = this.props.form.getFieldValue('memberName');
                let memberStatus = this.props.form.getFieldValue('memberStatus');
                this.getListData(mobile, memberName, memberStatus, currentPage, currentPageSize);
            };

            render() {
                const { getFieldDecorator } = this.props.form;
                const { mobile, memberName, memberStatus, currentPage, currentPageSize } = this.props.FormalMemberList;
                const { total, loading, dataList } = this.state;
                const columns = [
                    {
                        title: '编号',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: '手机号码',
                        dataIndex: 'mobile',
                        key: 'mobile',
                    },
                    {
                        title: '会员名称',
                        dataIndex: 'user_name',
                        key: 'user_name',
                    },
                    {
                        title: '会员头像',
                        dataIndex: 'avatar',
                        key: 'avatar',
                        width: 200,
                        render: (text: any, record: any) => (
                            <span>
                                <img src={record.avatar} alt="" width="91px" height="48px" />
                            </span>
                        ),
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
                        title: '账号状态',
                        dataIndex: 'is_effect',
                        key: 'is_effect',
                        render: (text: any, record: any) => (
                            <span>
                                {record.is_effect == 0 ? "冻结" : "正常"}
                            </span>
                        )
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (text: any, record: any) => (
                            <span>
                                <a onClick={() => router.push(`/memberManagement/formalMember/memberDetail?id=${record.id}`)}>查看信息</a>
                                <Divider type="vertical" />
                                {/* <a onClick={() => router.push(`/memberManagement/formalMember/memberEdit?id=${record.id}`)}>编辑信息</a> */}
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