import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import { getGiftDetails } from '../service'
import styles from './index.less'

export default class GiftDetails extends Component {
  state = {
    id: '',
    gift_type: null,
    gift_name: '',
    gift_original_money: '',
    gift_money: '',
    status: '',
    total_repertory_num: '',
    total_give_num: '',
    total_surplus_num: '',
    each_num: '',
    delivery_type: null,
    delivery_pay_type: '',
    use_description: '',
    rule_description: '',
    gift_detail: '',
    created_at: '',
    gift_image: ''

  }
  componentDidMount() {
    getGiftDetails(29).then(res => {
      this.setState({
        ...this.state,
        ...res.data
      })
    })
  }

  render() {
    const { gift_name, gift_type, delivery_type, total_repertory_num, gift_image } = this.state
    return (
      <div className={styles.details_page}>
        <Breadcrumb>
          <Breadcrumb.Item>礼品管理</Breadcrumb.Item>
          <Breadcrumb.Item>礼品详情</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <div className={styles.layout_box}>
            <div className={styles.block}>
              <div className={styles.block_item}>
                <div className={styles.item_label}>礼品类型：</div>
                <div className={styles.item_main}>{gift_type == 1 ? '现金券' : gift_type == 2 ? '商品券' : gift_type == 3 ? '实物券' : null}</div>
              </div>
              <div className={styles.block_item}>
                <div className={styles.item_label}>礼品价格：</div>
                <div className={styles.item_main}>0元</div>
              </div>
              <div className={styles.block_item}>
                <div className={styles.item_label}>配送方式：</div>
                <div className={styles.item_main}>{delivery_type == 1 ? '快递' : null}</div>
              </div>
              <div className={styles.block_item}>
                <div className={styles.item_label}>礼品图片：</div>
                <div className={styles.item_main}><img src={gift_image} /></div>
              </div>
            </div>

            <div className={styles.block}>
              <div className={styles.block_item}>
                <div className={styles.item_label}>礼品名称：</div>
                <div className={styles.item_main}>{gift_name}</div>
              </div>
              <div className={styles.block_item}>
                <div className={styles.item_label}>礼品数量：</div>
                <div className={styles.item_main}>{total_repertory_num}个</div>
              </div>
              <div className={styles.block_item}>
                <div className={styles.item_label}>邮费：</div>
                <div className={styles.item_main}>平台承担</div>
              </div>
              <div className={styles.block_item}>
                <div className={styles.item_label}>使用规则：</div>
                <div className={styles.item_main}>
                  <div>222</div>
                </div>
              </div>
            </div>

            <div className={styles.block}>
              <div className={styles.block_item}>
                <div className={styles.item_label}>礼品类型：</div>
                <div className={styles.item_main}>{gift_type == 1 ? '现金券' : gift_type == 2 ? '商品券' : gift_type == 3 ? '实物券' : null}</div>
              </div>
              <div className={styles.block_item}>
                <div className={styles.item_label}>礼品价格：</div>
                <div className={styles.item_main}>0元</div>
              </div>
              <div className={styles.block_item}>
                <div className={styles.item_label}>礼品图片：</div>
                <div className={styles.item_main}><img /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
