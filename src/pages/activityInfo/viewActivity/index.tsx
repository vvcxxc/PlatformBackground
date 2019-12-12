import React, {useState, useEffect} from 'react'
import styles from './index.less'

function ViewActivity (Props:any) {
  useEffect(()=>{

  },[])

  return (
    <div className={styles.viewPage}>
      <div className={styles.header}>
        活动招募信息
      </div>
      <div className={styles.add_layout}>
        <div className={styles.title}>活动名称</div>
        <div>523423</div>
      </div>

      <div className={styles.add_layout}>
        <div className={styles.title}>活动区域</div>
        <div>523423</div>
      </div>

      <div className={styles.add_layout}>
        <div className={styles.title}>招募时间</div>
        <div>2019-10-12至2019-12-12</div>
      </div>

      <div className={styles.add_layout}>
        <div className={styles.title}>卡券限制</div>
        <div>523423</div>
      </div>

      <div className={styles.add_layout}>
        <div className={styles.title}>招募活动图</div>
        <img src="" className={styles.cover_image}/>
      </div>

      <div className={styles.add_layout}>
        <div className={styles.title}>招募规则</div>
        <div className={styles.ruleList}>
          <div>123</div>
        </div>
      </div>

      <div className={styles.add_layout}>
        <div className={styles.title}>活动简介</div>
        <div>523423</div>
      </div>
    </div>
  )
}
export default ViewActivity
