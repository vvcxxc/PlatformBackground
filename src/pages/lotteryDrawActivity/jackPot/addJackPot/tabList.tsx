import React, { Component } from 'react';
import { Table } from 'antd';
interface Props {
  selectChange?: any;
}
export default class TabList extends Component<Props> {
  state = {};
  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'code',
      },
      {
        title: '礼品id',
        dataIndex: 'id',
      },
      {
        title: '礼品名称',
        dataIndex: 'name',
      },
      {
        title: '礼品库存',
        dataIndex: 'number',
      },
      {
        title: '商品价值',
        dataIndex: 'price',
        render: (text: Number | String) => <a>{text}</a>,
      },
    ];
    const data = [
      {
        key: '1',
        code: '1',
        id: 'PC9527',
        name: '华为P30',
        number: 2,
        price: 676,
      },
      {
        key: '2',
        code: '2',
        id: 'PC9527',
        name: '华为P31',
        number: 2,
        price: 676,
      },
      {
        key: '3',
        code: '3',
        id: 'PC9527',
        name: '华为P32',
        number: 2,
        price: 676,
      },
      {
        key: '4',
        code: '004',
        id: 'PC9527',
        name: '华为P33',
        number: 2,
        price: 676,
      },
      {
        key: '5',
        code: '555',
        id: 'PC9527',
        name: '华为P34',
        number: 2,
        price: 676,
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
        dataSource={data}
        pagination={{
          current: 1,
          defaultCurrent: 1,
          showSizeChanger: true,
          showQuickJumper: true,
          total: 5, //总条数
          showTotal: () => {
            return `共${5}条`; //总条数
          },
        }}
      />
    );
  }
}
