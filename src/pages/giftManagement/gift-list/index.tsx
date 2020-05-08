import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Select, Table, Divider, } from 'antd'
import request from '@/utils/request';
import { router } from 'umi';
import { connect } from "dva";

interface Props {
    form: any;
    dispatch: (opt: any) => any;
    giftList: any
}


export default Form.create()(
    connect(({ giftList }: any) => ({ giftList }))(
        class GiftList extends Component<Props> {

            state = {
                total: 0,
                loading: false,
                dataList: []
            }


            componentDidMount() {
                const {
                    currentPage,
                    currentPageSize
                } = this.props.giftList;

                this.getListData(currentPage, currentPageSize);
            }

            getListData = (currentPage: any, currentPageSize: any) => {
                this.setState({
                    loading: true
                })
                request('/api/v1/gift', {
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

            handleChange = async (pagination: any, filters: any, sorter: any) => {
                await this.props.dispatch({
                    type: 'giftList/setPaginationCurrent',
                    payload: {
                        currentPage: pagination.current,
                        currentPageSize: pagination.pageSize,
                    },
                });
                const { currentPage, currentPageSize } = this.props.giftList;
                this.getListData(currentPage, currentPageSize);
            };

            render() {
                const columns = [
                    {
                        title: 'id',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: "礼品名称",
                        dataIndex: 'gift_name',
                        key: 'gift_name',
                    },
                    {
                        title: "礼品类型",
                        dataIndex: 'gift_type',
                        key: 'gift_type',
                        render: (text: any, record: any) => (
                            <span>
                                {record.gift_type == 1 ? "现金券" : record.gift_type == 2 ? "商品券" : record.gift_type == 3 ? "实物礼品" : ""}
                            </span>
                        )
                    },
                    {
                        title: '礼品数量',
                        dataIndex: 'total_repertory_num',
                        key: 'total_repertory_num',
                    },
                    {
                        title: "已使用数量",
                        dataIndex: 'total_give_num',
                        key: 'total_give_num',
                    },
                    {
                        title: "创建时间",
                        dataIndex: 'created_at',
                        key: 'created_at',
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (text: any, record: any) => (
                            <span>
                                <a>查看详情</a>
                                <Divider type="vertical" />
                                <a>增加库存</a>
                                <Divider type="vertical" />
                                <a>编辑</a>
                            </span>
                        )
                    },
                ]
                const { total, loading, dataList } = this.state;
                const { currentPage, currentPageSize } = this.props.giftList;
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