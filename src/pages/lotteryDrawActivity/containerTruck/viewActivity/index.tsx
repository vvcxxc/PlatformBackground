import React, { useEffect, useState } from 'react'
import styles from './index.less'
import { Spin, Table } from 'antd'
function ViewActivity() {
  const [info, SetInfo] = useState({})
  const [Loading, setLoading] = useState(false)
  useEffect(() => {

  }, [])


  const columns = [
    {
      title: '编号',
      dataIndex: 'id'
    },
    {
      title: '选择卡片',
      dataIndex: 'card',
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

  return (
    <div className={styles.page}>
      <Spin spinning={Loading}>
        <div className={styles.header}>
          集卡抽奖
        </div>
        <div className={styles.main}>
          <div className={styles.title}>活动基本信息</div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>活动名称</div>
            <div>江西鹰潭双旦抽奖活动</div>
          </div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>活动时间</div>
            <div>2019-12-12至2019-12-14</div>
          </div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>活动区域</div>
            <div>江西鹰潭</div>
          </div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>派发条件</div>
            <div>满100元</div>
          </div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>派卡限制</div>
            <div>100张/天</div>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.title}>活动卡片项目</div>
          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Table
              pagination={false}
              columns={columns}
              dataSource={data}
              style={{ width: '510px' }}
              size='small'
            />
          </div>

          <div>
            <div className={styles.title}>抽奖条件信息</div>
            <div className={styles.condition}>
              <div className={styles.item_layout}>
                <div className={styles.item_title}>抽奖条件</div>
                <div>卡片为第一次获得</div>
              </div>
              <div className={styles.item_layout}>
                <div className={styles.item_title}>关联卡片</div>
                <div>小；熊；敬；礼</div>
              </div>
              <div className={styles.item_layout}>
                <div className={styles.item_title}>奖池设定</div>
                <div>鹰潭区域卡券奖池</div>
              </div>
            </div>
          </div>
        </div>


      </Spin>
    </div>
  )
}
export default ViewActivity
