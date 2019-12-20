import React, { Component } from 'react';
import { Table, notification } from 'antd';
import request from '@/utils/request';
import { router } from 'umi';
interface Props {
  selectChange?: any;
}
export default class TabList extends Component<Props> {
  state = {
    page: 1,
    giftList: [],
    pagination: {
      count: 0,
      current_page: 1,
      total: 0,
      total_pages: 0
    },
    total: ''
  };
  componentDidMount() {
    this.getData(1, 10);
  }
  getData = (page: Number, count: Number) => {
    console.log(page,count)
    let url = "/api/v1/pools/ActivityPrizes";
    request(url, {
      method: 'get',
      data: { page, count },
    })
      .then(res => {
        if (res.status_code == 200) {    
          this.setState({ giftList: res.data, pagination: res.pagination })
        } else {
          notification.open({ message: res.message });
        }
      })
      .catch(err => { });
  }
  changePage = (selectedRowKeys: any, selectedRows: any) => {
    this.getData(selectedRowKeys.current, selectedRowKeys.pageSize);
  }
  render() {
    const columns = [
      // {
      //   title: '编号',
      //   dataIndex: 'id',
      //   align: 'center'
      // },
      {
        title: '礼品id',
        dataIndex: 'id',
        align: 'center'
      },
      {
        title: '礼品名称',
        dataIndex: 'name',
        align: 'center'
      },
      {
        title: '礼品库存',
        dataIndex: 'stock',
        align: 'center'
      },
      {
        title: '商品价值',
        dataIndex: 'market_price',
        align: 'center',
        render: (text: Number | String) => <div>{text}元</div>,
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        this.props.selectChange && this.props.selectChange(selectedRows);
      },
      getCheckboxProps: (record: any) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    return (
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={this.state.giftList}
        onChange={this.changePage}
        pagination={{
          current: 1,
          defaultCurrent: 1,
          showSizeChanger: true,
          showQuickJumper: true,
          total: this.state.pagination.total, //总条数
          showTotal: () => {
            return `共${this.state.pagination.total}条`; //总条数
          },
        }}
      />
    );
  }
}
