import React, { Component } from 'react';
import styles from './index.less';
import { Spin, Table, Button } from 'antd';
import request from '@/utils/request';
export default class ViewJackPot extends Component {
  state = {
    Loading: false, //loading
    info: {
    },
    dataSource: [
      {
        key: '1',
        number: '1',
        giftId: 'PC9527',
        name: '谢谢参与',
        percent: '10%',
      },
      {
        key: '2',
        number: '2',
        giftId: 'PC9528',
        name: '华为P30',
        percent: '20%',
      },
      {
        key: '3',
        number: '3',
        giftId: 'PC9529',
        name: '小米充电宝',
        percent: '30%',
      },
    ],
  };

  componentDidMount() {
    let id = this.props.location.query.id
    request.get('/api/v1/pools/'+ id).then(res => {
      if(res.status_code == 200){
        if(res.data.type == 2){
          for (let i in res.data.objectPools.prize){
            res.data.objectPools.prize[i].key = i
          }
        }
        this.setState({info:res.data})
      }
    })
  }

  render() {
    const { Loading } = this.state;
    const columns = [
      {
        title: '编号',
        dataIndex: 'number',
        key: 'number',
        render: (a: any,b: any,idx: number) =>{
          return idx+1
        }
      },
      {
        title: '礼品ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '礼品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '中奖率',
        dataIndex: 'probability',
        key: 'probability',
        render: (text: any) =>{
          return text + '%'
        }
      },
    ];
    const {info} = this.state
    return (
      <div className={styles.page}>
        <Spin spinning={Loading}>
          <div className={styles.header}>编辑活动奖池</div>
          <div className={styles.main}>
            <div className={styles.title}>奖池配置</div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>奖池名称</div>
              <div>{info.name}</div>
            </div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>奖品类型</div>
              <div>{info.type == 1 ? '线上卡券' : '实物奖品'}</div>
            </div>
            <div className={styles.item_layout}>
              <div className={styles.item_title}>关联的营销活动</div>
              <div>{info.activity_name}</div>
            </div>
          </div>

          {
            info.type == 1 ? (
              <div className={styles.main}>
              <div className={styles.title}>线上卡券奖池</div>
              <div className={styles.item_layout}>
                <div className={styles.item_title}>关联活动</div>
                <div>{info.activity_name}</div>
              </div>
              <div className={styles.item_layout}>
                <div className={styles.item_title}>礼品数量</div>
            <div>已设置{info.cardPools.number}张</div>
              </div>
              <div className={styles.item_layout}>
                <div className={styles.item_title}>谢谢参与中奖率</div>
                <div>{info.cardPools.not_win_probability}%</div>
              </div>
              <div className={styles.item_layout}>
                <div className={styles.item_title}>每日卡券库存</div>
                <div>{info.cardPools.daily_number}</div>
              </div>
            </div>
            ) : info.type == 2 ? (
              <div className={styles.main}>
              <div className={styles.title}>实物奖品奖池</div>
              <div className={styles.item_layout}>
                <div className={styles.item_title}>实物数量</div>
                <div>已选择{info.objectPools.number}份</div>
              </div>
              <div className={styles.item_layout}>
                <div className={styles.item_title}>设置奖品中奖率</div>
                <div>
                  <Table
                    size="small"
                    style={{ width: '550px' }}
                    dataSource={info.objectPools.prize}
                    columns={columns}
                    pagination={false}
                  />
                </div>
              </div>
            </div>
            ) : null
          }



          <div style={{ marginTop: 10 }}>
            <Button type="danger">关闭</Button>
          </div>
        </Spin>
      </div>
    );
  }
}
