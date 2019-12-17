import React, {Component} from 'react'
import styles from './index.less'
import {Spin, Input, Table, Button} from 'antd'
class EditJackPot extends Component {
  state = {
    Loading: false, //loading
    dataSource: [
      {
        key: '1',
        number: '1',
        giftId: 'PC9527',
        name: '谢谢参与',
      },
      {
        key: '2',
        number: '2',
        giftId: 'PC9528',
        name: '华为P30',
      },
      {
        key: '3',
        number: '3',
        giftId: 'PC9529',
        name: '小米充电宝',
      },
    ],
  }

  render (){
    const {Loading} = this.state
    const columns = [
      {
        title: '编号',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: '礼品ID',
        dataIndex: 'giftId',
        key: 'giftId',
      },
      {
        title: '礼品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '中奖率',
        dataIndex: 'percent',
        render: () => (
          <div>
            <Input className={styles.inputBox} placeholder="设置中奖率" />%
          </div>
        ),
      },
    ];
    return (
      <div className={styles.page}>
        <Spin spinning={Loading}>
          <div className={styles.header}>
            编辑活动奖池
          </div>
          <div className={styles.main}>
            <div className={styles.title}>奖池配置</div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>奖池名称</div>
              <div>鹰潭线上奖池</div>
            </div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>奖品类型</div>
              <div>线上卡券</div>
            </div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>关联的营销活动</div>
              <div>双十一鹰潭区域免费推广</div>
            </div>
          </div>

          <div className={styles.main}>
            <div className={styles.title}>线上卡券奖池</div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>关联活动</div>
              <div>双十一鹰潭区域免费推广</div>
            </div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>礼品数量</div>
              <div>已设置xx张</div>
            </div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>谢谢参与中奖率</div>
              <Input type='number' size='small' style={{width: '170px', marginRight: 5}}/>%
            </div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>每日卡券库存</div>
              <Input type='number' size='small' style={{width: '170px', marginRight: 5}}/>张
            </div>
          </div>

          <div className={styles.main}>
            <div className={styles.title}>实物奖品奖池</div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>实物数量</div>
              <div>已选择xx份</div>
            </div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>设置奖品中奖率</div>
              <div>
                <Table
                  size='small'
                  style={{width: '550px'}}
                  dataSource={this.state.dataSource}
                  columns={columns}
                  pagination={false}
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
          <Button type='primary' style={{ marginRight: 30 }}>发布活动</Button>
          <Button type='danger'>取消</Button>
        </div>
        </Spin>
      </div>
    )
  }
}

export default EditJackPot
