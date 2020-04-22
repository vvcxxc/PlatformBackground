import React, { Component } from 'react'
import styles from './index.less'
import { Breadcrumb, Radio, notification, Select, Button, Spin } from 'antd'
import InputBox from '@/components/myComponents/InputBox'
import UploadBox from '@/components/myComponents/uploadBox'
import router from 'umi/router'
import request from '@/utils/request'
const { Option } = Select;

export default class PayDetails extends Component {
  state = {
    Loading: false,
    sub_status: null,
    contact_name: '',
    legal_id_no: '',
    legal_id_valid_date: '',
    hand_hold_id_img: '',
    legal_id_back_img: '',
    legal_id_front_img: ''
  }

  async componentWillMount() {
    let phone = this.props.location.query.phone
    let channel_id = this.props.location.query.channel_id
    // request.get('/api/sq/',{
    //   params: {phone}
    // }).then(res => {
    //   if(res.data != []){
    //     this.setState({...res.data})
    //   }
    // })
    let res = await request.get('/api/v2/sq/', { params: { phone, channel_id } })
    if (res.status_code == 200) {
      if (res.data != []) {
        this.setState({ ...res.data })
      }
    } else {
      notification.error({ message: res.message })
    }

    request.get('http://api.supplier.tdianyi.com/v3/manage_type').then(res => {
      if (res.code == 200) {
        this.setState({
          typeList: res.data
        })
      }
    })
  }

  radioChange = (type: string) => (e: any) => {
    if (type == 'type') {
      this.setState({ type: e.target.value })
    }
    console.log(e.target.value)
  }

  inputChange = (type: string) => (value: any) => {
    this.setState({ [type]: value })
  }

  imageChange = (type: string) => (path: string) => {
    console.log(type, path)
    this.setState({ [type]: path })
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

  // 提交数据
  submit = () => {
    let phone = this.props.location.query.phone
    this.setState({ Loading: true })
    const channel_id = this.props.location.query.channel_id
    request.post('/api/v2/sq', {
      data: {
        phone: phone,
        channel_id
      }
    }).then(res => {
      this.setState({ Loading: false })
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
    }).catch(err => this.setState({ Loading: false }))
  }

  confirm = () => {
    const phone = this.props.location.query.phone
    const channel_id = this.props.location.query.channel_id
    const { contact_name, legal_id_no, legal_id_valid_date, hand_hold_id_img, legal_id_back_img, legal_id_front_img } = this.state
    const data = {
      phone,
      channel_id,
      contact_name, legal_id_no, legal_id_valid_date, hand_hold_id_img, legal_id_back_img, legal_id_front_img
    }
    request.put('/api/v2/sq/update', { data }).then(res => {
      if(res.status_code == 200){
        notification.success({
          message: res.message,
        });
        router.goBack()
      }else{
        notification.error({
          message: res.message
        })
      }
    })
  }

  render() {
    const { Loading, contact_name, message, legal_id_no, legal_id_valid_date, hand_hold_id_img, legal_id_back_img, legal_id_front_img, status, sub_status } = this.state
    return (
      <div className={styles.page}>
        <Breadcrumb>
          <Breadcrumb.Item><a onClick={() => router.goBack()}>商家审核</a></Breadcrumb.Item>
          <Breadcrumb.Item>支付审核</Breadcrumb.Item>
        </Breadcrumb>
        <Spin spinning={Loading}>
          <div className={styles.title}>基本信息</div>
          <div className={styles.radioBox}>
            <Radio.Group defaultValue="a" buttonStyle="solid" onChange={this.radioChange('channel')}>
              <Radio.Button value="a">双乾通道</Radio.Button>
            </Radio.Group>
          </div>
          <div className={styles.layout}>
            <div>提交双乾审核：{sub_status ? '已提交' : '未提交'}</div>
            <Button type='primary' style={{ marginLeft: 30 }} onClick={this.submit} disabled={status == 1 ? true : false}>提交数据</Button>
          </div>
          <div className={styles.layout}>
            <div className={styles.status}>认证状态：{this.status(status)}</div>
            <div className={styles.reason}>返回信息：{message}</div>
          </div>

          <div className={styles.radioBox}>
            <Radio.Group onChange={this.radioChange('type')} defaultValue={1}>
              <Radio value={1}>个人商户</Radio>
              {/*<Radio value={0}>企业商户</Radio>*/}
            </Radio.Group>
          </div>


          {/* 身份证信息 */}
          <div className={styles.title}>身份证信息</div>
          <InputBox label='姓名' onChange={this.inputChange('contact_name')} value={contact_name} />
          <InputBox label='身份证号' onChange={this.inputChange('legal_id_no')} value={legal_id_no} />
          <InputBox label='有效期' onChange={this.inputChange('legal_id_valid_date')} value={legal_id_valid_date} />
          <div className={styles.imageLayout}>
            <div className={styles.label}>证件照片：</div>
            <UploadBox style={{ margin: '0 20px' }} onChange={this.imageChange('legal_id_front_img')} title='身份证正面' imgUrl={legal_id_front_img} />
            <UploadBox style={{ margin: '0 20px' }} onChange={this.imageChange('legal_id_back_img')} title='身份证反面' imgUrl={legal_id_back_img} />
            <UploadBox style={{ margin: '0 20px' }} onChange={this.imageChange('hand_hold_id_img')} title='手持身份证' imgUrl={hand_hold_id_img} />
          </div>

          <div className={styles.buttonBox}>
            <Button type='primary' className={styles.confirm} onClick={this.confirm}>确定</Button>
            <Button onClick={() => router.goBack()}>取消</Button>
          </div>
        </Spin>
      </div>
    )
  }
}
