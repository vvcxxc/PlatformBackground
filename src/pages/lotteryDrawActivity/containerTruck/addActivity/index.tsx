import React, { Component } from 'react'
import styles from './index.less'
import { Input, DatePicker, Select, Spin, Table, Icon, Button } from 'antd'
const { Option } = Select;
const { RangePicker } = DatePicker;
import request from '@/utils/request'
class AddActivity extends Component {
  state = {
    Loading: true, // 页面loading
    area_list: [], // 商圈
    condition: [{}], // 条件数量
    area_id: '', // 商圈id
  }
  componentDidMount() {
    request('/api/common/area', { method: 'get' }).then(res => {
      this.setState({ area_list: res.data, Loading: false })
    }).catch(() => {
      this.setState({ Loading: false })
    })
  }

  addCondition = () => {
    const { condition } = this.state;
    if (condition.length <= 1) {
      this.setState({ condition: [...condition, {}] })
    }
  }

  // 抽奖条件的选择
  selectItem = (type: string, index: number) => (value: any) => {
    console.log(type, value, index)
  }

  // input输出
  inputChange = (type: string) => ({ target: { value } }) => {
    console.log(type, value)
  }

   // 选择日期
   selectDate = (time: any) => {

  }
  // 选择商圈
  selectArea = (value: string) => {
    this.setState({ area_id: value })
  }


  render() {
    const { Loading, area_list, condition } = this.state
    const columns = [
      {
        title: '编号',
        dataIndex: 'id'
      },
      {
        title: '选择卡片',
        dataIndex: 'card',
        // render: (text, record: any) => (
        //   <span>
        //     <Select defaultValue='请选择卡片' style={{ width: 150 }}>
        //       {/* <Option value='1'>1</Option> */}
        //       {
        //         record.card.length ? record.card.map((item: any, index: number) => {
        //           return <Option value={item} key={index}>{item}</Option>
        //         }) : null
        //       }
        //     </Select>
        //   </span>
        // )
      },
      {
        title: '卡片编号',
        dataIndex: 'number'
      }
    ]
    const data = [
      {
        key: '22',
        number: 'A001',
        card: '小',
        id: '1'
      }
    ]

    // 抽奖条件
    const conditionList = condition.map((item, index) => {
      return <div key={index}>
        <div className={styles.title}>设置抽奖条件{index + 1}</div>
        <div className={styles.condition}>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>抽奖条件</div>
            <Select defaultValue='每次获得卡片' style={{ width: 200 }} size='small' onChange={this.selectItem('rule', index)}>
              <Option value='1'>122</Option>
              <Option value='2'>133</Option>
            </Select>
          </div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>奖池设定</div>
            <Select defaultValue='请选择奖池' style={{ width: 200 }} size='small' onChange={this.selectItem('pool_id', index)}>
              <Option value='3'>144</Option>
              <Option value='4'>155</Option>
            </Select>
          </div>
        </div>
      </div>
    })

    return (
      <div className={styles.page}>
        <Spin spinning={Loading}>
          <div className={styles.header}>
            集卡抽奖
          </div>

          <div className={styles.main}>
            <div className={styles.title}>配置活动基本信息</div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>设置活动名称</div>
              <Input size='small' style={{ width: '390px' }} />
            </div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>设置活动时间</div>
              <RangePicker
                size='small'
                onChange={this.selectDate}
              />
            </div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>选择活动区域</div>
              <Select defaultValue="请选择商圈" style={{ width: 200 }} size='small' onChange={this.selectArea}>
                {
                  area_list.length ? area_list.map(item => {
                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                  }) : null
                }
              </Select>
            </div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>派发条件</div>
              满<Input size='small' style={{ width: '110px', marginLeft: '5px', marginRight: '5px' }} />元
            </div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>派卡限制</div>
              <Input size='small' style={{ width: '110px', marginRight: '5px' }} />张/天
            </div>
          </div>

          <div className={styles.main}>
            <div className={styles.title}>配置活动卡片信息</div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>设置卡数量</div>
              <Select defaultValue='请选择卡片数量' style={{ width: 200 }} size='small'>
                <Option value='1'>1</Option>
              </Select>
            </div>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
              <Table
                pagination={false}
                columns={columns}
                dataSource={data}
                style={{ width: '510px' }}
                size='small'
              />
            </div>

            {/* 抽奖条件 */}
            {conditionList}
            <div className={styles.addCondition} onClick={this.addCondition}>
              <Icon type="plus-circle" theme="filled" style={{ paddingRight: 5, fontSize: 18 }} />添加抽奖条件
            </div>
          </div>

          <div style={{marginTop: 10}}>
            <Button type='primary' style={{marginRight: 30}}>发布活动</Button>
            <Button type='danger'>取消</Button>
          </div>
        </Spin>
      </div>
    )
  }
}

export default AddActivity
