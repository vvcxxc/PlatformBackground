import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Spin, Button, Input, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import request from '@/utils/request';
function EditActivity(props: any) {
  const [a, setA] = useState(1);
  const [info, setInfo] = useState([]);
  const [startDate, setStart] = useState();
  const [endDate, setEnd] = useState();
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    // componentDidMount生命周期

    let id = props.location.query.id
    request.get('/api/v1/activity/cardcollecting/edit',{params: {id}}).then(res => {
      console.log(res)
    })
  }, []);

  // 选择日期
  const selectDate = (time: any) => {
    setStart(moment(time[0]));
    setEnd(moment(time[1]));
  };

  const handleInput = (type: string) => ({ target: { value } }) => {
    console.log(type);
  };

  return (
    <div className={styles.page}>
      <Spin spinning={Loading}>
        <div className={styles.header}>集卡抽奖</div>
        <div className={styles.main}>
          <div className={styles.title}>修改活动基本信息</div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>活动名称</div>
            <div>江西鹰潭双旦抽奖活动</div>
          </div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>活动时间</div>
            <RangePicker size="small" onChange={selectDate} />
          </div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>设置活动区域</div>
            <div>江西鹰潭商圈</div>
          </div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>派发条件</div>
            满
            <Input
              size="small"
              style={{ width: '110px', marginLeft: '5px', marginRight: '5px' }}
              onChange={handleInput('')}
            />
            元
          </div>
          <div className={styles.item_layout}>
            <div className={styles.item_title}>派卡限制</div>
            <Input
              size="small"
              style={{ width: '110px', marginRight: '5px' }}
              onChange={handleInput('')}
            />
            张/天
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" style={{ marginRight: 30 }}>
            发布活动
          </Button>
          <Button type="danger">取消</Button>
        </div>
      </Spin>
    </div>
  );
}

export default EditActivity;
