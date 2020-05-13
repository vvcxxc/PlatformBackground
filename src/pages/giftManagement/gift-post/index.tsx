import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Select, Table, Divider, Modal, InputNumber, message } from 'antd'
import request from '@/utils/request';
import { router } from 'umi';
import { connect } from "dva";
import styles from './index.less';

const { confirm } = Modal;
const { Option } = Select;

interface Props {
    form: any;
    dispatch: (opt: any) => any;
    giftPost: any
}


export default Form.create()(
    connect(({ giftPost }: any) => ({ giftPost }))(
        class GiftPost extends Component<Props> {

            state = {
                total: 0,
                loading: false,
                dataList: [],
                company: [],

                delivery_company_id: 0,  //物流公司id	
                delivery_sn: "", // 物流单号	
            }

            componentDidMount() {
                const {
                    currentPage,
                    currentPageSize
                } = this.props.giftPost;

                this.getListData(currentPage, currentPageSize);

                this.getAllCompany();
            }

            getListData = (currentPage: any, currentPageSize: any) => {
                this.setState({
                    loading: true
                })
                request('/api/v1/gift/orderGiftLog', {
                    method: 'GET',
                    params: {
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

            getAllCompany = () => {
                request('/api/v1/gift/deliveryCompany', {
                    method: "GET"
                }).then((res: any) => {
                    if (res.status_code == 200) {
                        this.setState({
                            company: res.data
                        })
                    }
                })
            }

            handleSelectCompany = (e) => {
                this.setState({
                    delivery_company_id: e
                })
            }

            handleInpOrderNum = (e) => {
                this.setState({
                    delivery_sn: e.target.value
                })
            }

            handleChange = async (pagination: any, filters: any, sorter: any) => {
                await this.props.dispatch({
                    type: 'giftPost/setPaginationCurrent',
                    payload: {
                        currentPage: pagination.current,
                        currentPageSize: pagination.pageSize,
                    },
                });
                const { currentPage, currentPageSize } = this.props.giftPost;
                this.getListData(currentPage, currentPageSize);
            };

            handleOrderNum = (id: any) => {
                const _this = this;
                confirm({
                    title: '填写单号',
                    content: (
                        <div>
                            <div className={styles.item_layout}>
                                <div className={styles.item_title}>物流公司</div>
                                <Select style={{ width: 220 }} onSelect={this.handleSelectCompany}>
                                    {
                                        this.state.company.map((item: any) => (
                                            <Option value={item.id}>{item.company_name}</Option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className={styles.item_layout}>
                                <div className={styles.item_title}>单号</div>
                                <Input style={{ width: 220 }} onChange={this.handleInpOrderNum} />
                            </div>
                        </div>
                    ),
                    okText: '确定',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk() {
                        request('/api/v1/gift/orderGiftLog', {
                            method: "POST",
                            data: {
                                order_gift_log_id: id,
                                delivery_company_id: _this.state.delivery_company_id,
                                delivery_sn: _this.state.delivery_sn
                            }
                        }).then((res: any) => {
                            if (res.status_code == 200) {
                                message.success(res.message);
                                const {
                                    currentPage,
                                    currentPageSize
                                } = _this.props.giftPost;

                                _this.getListData(currentPage, currentPageSize);
                            } else {
                                message.error(res.message);
                            }
                        })
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                });
            }

            render() {
                const columns = [
                    {
                        title: 'id',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: "微信用户",
                        dataIndex: 'user',
                        key: 'user',
                        render: (text: any, record: any) => (
                            <span>{record.user.user_name}</span>
                        )
                    },
                    // {
                    //     title: "头像",
                    //     dataIndex: 'gift_image',
                    //     key: 'gift_image',
                    //     render: (text: any, record: any) => (
                    //         <img src={`http://tmwl.oss-cn-shenzhen.aliyuncs.com/${record.gift_image}`} width="90" height="90" alt="" />
                    //     )
                    // },
                    {
                        title: '收货人',
                        dataIndex: 'order_address',
                        key: 'order_address',
                        render: (text: any, record: any) => (
                            <span>{record.order_address.user_name}</span>
                        )
                    },
                    {
                        title: "联系电话",
                        dataIndex: 'order_address',
                        key: 'order_address',
                        render: (text: any, record: any) => (
                            <span>{record.order_address.user_phone}</span>
                        )
                    },
                    {
                        title: "收货地址",
                        dataIndex: 'order_address',
                        key: 'order_address',
                        render: (text: any, record: any) => (
                            <span>{record.order_address.address}</span>
                        )
                    },
                    {
                        title: "礼品名称",
                        dataIndex: 'gift_name',
                        key: 'gift_name',
                    },
                    {
                        title: "礼品图片",
                        dataIndex: 'gift_name',
                        key: 'gift_name',
                        render: (text: any, record: any) => (
                            <img src={`http://tmwl.oss-cn-shenzhen.aliyuncs.com/${record.gift_image}`} width="90" height="90" alt="" />
                        )
                    },
                    {
                        title: '参与活动',
                        dataIndex: 'binding',
                        key: 'binding',
                        render: (text: any, record: any) => (
                            <span>{record.binding.binding_type == 1 ? "拼团活动" : record.binding.binding_type == 2 ? "增值活动" : record.binding.binding_type == 3 ? "优惠券" : ""}</span>
                        )
                    },
                    {
                        title: "商家",
                        dataIndex: 'binding_supplier',
                        key: 'binding_supplier',
                        render: (text: any, record: any) => (
                            <span>{record.binding_supplier.name}</span>
                        )
                    },
                    // {
                    //     title: "活动状态",
                    //     dataIndex: 'total_surplus_num',
                    //     key: 'total_surplus_num',
                    // },
                    // {
                    //     title: "发货时间",
                    //     dataIndex: 'created_at',
                    //     key: 'created_at',
                    // },
                    {
                        title: "快递单号",
                        dataIndex: 'delivery_company_sn',
                        key: 'delivery_company_sn',
                    },
                    {
                        title: "快递公司",
                        dataIndex: 'delivery_company_name',
                        key: 'delivery_company_name',
                    },
                    {
                        title: "物流状态",
                        dataIndex: 'delivery_status',
                        key: 'delivery_status',
                        render: (text: any, record: any) => (
                            <span>{record.delivery_status == 0 ? "待接单" : record.delivery_status == 1 ? "已接单" : record.delivery_status == 2 ? "配送中" : record.delivery_status == 3 ? "配送成功" : record.delivery_status == 4 ? "配送失败" : ""}</span>
                        )
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (text: any, record: any) => (
                            <span>
                                {
                                    record.delivery_status == 0 ? (<a onClick={this.handleOrderNum.bind(this, record.id)}>填写单号</a>) : ""
                                }
                                <Divider type="vertical" />
                            </span>
                        )
                    },
                ]
                const { total, loading, dataList } = this.state;
                const { currentPage, currentPageSize } = this.props.giftPost;
                return (
                    <div>
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
