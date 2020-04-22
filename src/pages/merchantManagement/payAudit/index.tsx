import React, { Component } from 'react'
import styles from './index.less'
import { Breadcrumb, notification, Select, Button, Spin } from 'antd'
import InputBox from '@/components/myComponents/InputBox'
import router from 'umi/router'
import request from '@/utils/request'
const { Option } = Select;
class PayAudit extends Component {
  state = {
    type: 1,
    remarks: '',
    payment_status: null,
    Loading: false,
    status: '',
    message: ''
  }

  async componentWillMount() {
    let phone = this.props.location.query.phone
    request.get('/api/v2/sq/examine', { params: { phone } }).then(res => {
      console.log(res,res.data)
      if(res.status_code == 200 && res.data.length != 0){
        this.setState({status: res.data.sq.status, message: res.data.sq.message})
      }else{
        // notification.error({message:res.message})
      }
    })
  }

  inputChange = (type: string) => (value: any) => {
    this.setState({ [type]: value })
  }

  radioChange = (type: string) => (e: any) => {
    if (type == 'type') {
      this.setState({ type: e.target.value })
    }
    console.log(e.target.value)
  }

  //确定按钮
  confirm = () => {
    let phone = this.props.location.query.phone
    let channel_id = this.props.location.query.channel_id
    const { payment_status, remarks } = this.state
    request.post('/api/v2/sq/examine', {
      data: {
        phone,
        payment_status,
        remarks,
        channel_id
      }
    }).then(res => {
      console.log(res)
      if (res.status_code == 200) {
        notification.success({
          message: res.message,
        });
        router.goBack()
      } else {
        notification.error({
          message: res.message,
        });
      }
    })
  }

  status(type: any) {
    switch (type) {
      case 0: return '认证失败';
      case 1: return '已认证';
      case 2: return '未认证';
      case 3: return '审核中';
      case 4: return '未注册';
      default: return ''
    }
  }


  render() {
    const { Loading, remarks, payment_status,status, message } = this.state

    return (
      <div className={styles.page}>
        <Breadcrumb>
          <Breadcrumb.Item><a onClick={() => router.goBack()}>商家审核</a></Breadcrumb.Item>
          <Breadcrumb.Item>支付审核</Breadcrumb.Item>
        </Breadcrumb>
        <Spin spinning={Loading}>

          {/* 双乾审核 */}
          <div className={styles.title}>双乾审核</div>
          <div className={styles}>
            认证状态：{this.status(status)}
          </div>
          <div className={styles}>
            返回信息：{message}
          </div>

          {/* 审核设置 */}
          <div className={styles.title}>审核设置</div>
          <div className={styles.layout} style={{ alignItems: 'center' }}>
            <div className={styles.label}>审核状态：</div>
            <Select defaultValue="设置状态" style={{ width: 120 }} value={payment_status} onChange={this.inputChange('payment_status')}>
              <Option value={0}>未提交资料</Option>
              <Option value={1}>审核中</Option>
              <Option value={2}>拒绝</Option>
              <Option value={3}>通过</Option>
            </Select>
          </div>
          <InputBox label='备注原因' value={remarks} onChange={this.inputChange('remarks')} />

          <div className={styles.buttonBox}>
            <Button type='primary' className={styles.confirm} onClick={this.confirm}>确定</Button>
            <Button onClick={() => router.goBack()}>取消</Button>
          </div>
        </Spin>
      </div>
    )
  }
}

export default PayAudit
