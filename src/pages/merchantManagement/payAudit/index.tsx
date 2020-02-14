import React, { Component } from 'react'
import styles from './index.less'
import { Breadcrumb, Radio, notification, Select, Button } from 'antd'
import InputBox from '@/components/myComponents/InputBox'
import UploadBox from '@/components/myComponents/uploadBox'
import router from 'umi/router'
import request from '@/utils/request'
const { Option } = Select;
class PayAudit extends Component {
  state = {
    address: '',
    deal_cate_id: '',
    contact_name: '',
    legal_id_no: '',
    legal_id_valid_date: '',
    hand_hold_id_img: '',
    legal_id_back_img: '',
    legal_id_front_img: '',
    legal_name: '',
    corn_bus_name: '',
    three_certs_in_one_no: '',
    three_certs_in_one_valid_date: '',
    three_certs_in_one_img: '',
    settle_bank_account_no: '',
    settle_bank: '',
    bank_name: '',
    bank_card_front_img: '',
    bank_card_back_img: '',
    bank_opening_permit: '',
    typeList: [],
    type: 0
  }

  componentDidMount(){
    let id = this.props.location.query.id
    request.get('/api/sq/',{
      params: {supplier_id: id}
    }).then(res => {
      console.log(res)
      if(res.data.length){
        this.setState({...res.data})
      }
    })

    request.get('http://api.supplier.tdianyi.com/v3/manage_type').then(res => {
      this.setState({
        typeList: res.data
      })
    })
  }


  radioChange = (type: string) => (e: any) => {
    if(type == 'type'){
      this.setState({type: e.target.value})
    }
    console.log(e.target.value)
  }

  inputChange = (type: string) => (value: any) => {
    this.setState({ [type]: value })
  }

  imageChange = (type: string) => (path: string) => {
    this.setState({[type]: path})
  }

  // 提交数据
  submit = () => {
    let id = this.props.location.query.id
    request.post('/api/sq',{
      data: {
        supplier_id: id,
        type: this.state.type
      }
    }).then(res => {
      console.log(res)
      if(res.status_code == 200){
        notification.success({
          message: res.message,
        });
      }else {
        notification.error({
          message: res.message,
        });
      }
    })
  }

  render (){
    const { address,deal_cate_id, contact_name, legal_id_no, legal_id_valid_date, hand_hold_id_img, legal_id_back_img, legal_id_front_img, corn_bus_name, three_certs_in_one_no, three_certs_in_one_valid_date, three_certs_in_one_img, settle_bank_account_no, settle_bank, bank_name, bank_opening_permit, bank_card_back_img, bank_card_front_img, typeList } = this.state

    return (
      <div className={styles.page}>
        <Breadcrumb>
          <Breadcrumb.Item><a onClick={() => router.goBack()}>商家审核</a></Breadcrumb.Item>
          <Breadcrumb.Item>支付审核</Breadcrumb.Item>
        </Breadcrumb>

        <div className={styles.title}>基本信息</div>
        <div className={styles.radioBox}>
          <Radio.Group defaultValue="a" buttonStyle="solid" onChange={this.radioChange('channel')}>
            <Radio.Button value="a">双乾通道</Radio.Button>
            <Radio.Button value="b">服务商通道</Radio.Button>
            <Radio.Button value="c">小微通道</Radio.Button>
          </Radio.Group>
        </div>
        <div className={styles.layout}>
          <div>提交双乾审核：已提交</div>
          <Button type='primary' style={{marginLeft: 30}} onClick={this.submit}>提交数据</Button>
        </div>
        <div className={styles.layout}>
          <div className={styles.status}>认证状态：认证失败</div>
          <div className={styles.reason}>返回信息：组织结构代码证副本，编号错误</div>
        </div>

        <div className={styles.radioBox}>
          <Radio.Group onChange={this.radioChange('type')} value={this.state.type}>
            <Radio value={1}>个人商户</Radio>
            <Radio value={0}>企业商户</Radio>
          </Radio.Group>
        </div>

        {/* 门店信息 */}
        <div className={styles.title}>门店信息</div>
        <InputBox label='门店地址' onChange={this.inputChange('address')} value={address} />
        {/* <InputBox label='行业/经营品类' onChange={this.inputChange('address')} value={address} /> */}

        <div className={styles.layout} style={{ alignItems: 'center' }}>
          <div className={styles.label}>行业/经营品类：</div>
          <Select defaultValue='行业/经营品类' value={deal_cate_id} style={{ width: 120 }} onChange={this.inputChange('deal_cate_id')}>
            {/* <Option value="1">待审核</Option>
            <Option value="2">拒绝</Option>
            <Option value="3">通过</Option> */}
            {
              typeList.map(item => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>
              })
            }
          </Select>
        </div>

        {/* 身份证信息 */}
        <div className={styles.title}>身份证信息</div>
        <InputBox label='姓名' onChange={this.inputChange('contact_name')} value={contact_name} />
        <InputBox label='身份证号' onChange={this.inputChange('legal_id_no')} value={legal_id_no} />
        <InputBox label='有效期' onChange={this.inputChange('legal_id_valid_date')} value={legal_id_valid_date} />
        <div className={styles.imageLayout}>
          <div className={styles.label}>证件照片：</div>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='身份证正面' imgUrl={legal_id_front_img}/>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='身份证反面' imgUrl={legal_id_back_img}/>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='手持身份证' imgUrl={hand_hold_id_img}/>
        </div>

        {/* 营业执照 */}
        <div className={styles.title}>身份证信息</div>
        <InputBox label='营业执照名称' onChange={this.inputChange('corn_bus_name')} value={corn_bus_name} />
        <InputBox label='营业执照号' onChange={this.inputChange('three_certs_in_one_no')} value={three_certs_in_one_no} />
        <InputBox label='有效期' onChange={this.inputChange('three_certs_in_one_valid_date')} value={three_certs_in_one_valid_date} />
        <div className={styles.imageLayout}>
          <div className={styles.label}>证件照片：</div>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='营业执照图' imgUrl={three_certs_in_one_img}/>
        </div>

        {/* 银行卡信息 */}
        <div className={styles.title}>银行卡信息</div>
        <InputBox label='银行卡号' onChange={this.inputChange('settle_bank_account_no')} value={settle_bank_account_no} />
        <InputBox label='开户行' onChange={this.inputChange('settle_bank')} value={settle_bank} />
        <InputBox label='支行' onChange={this.inputChange('bank_name')} value={bank_name} />
        <div className={styles.imageLayout}>
          <div className={styles.label}>证件照片：</div>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='银行卡正面' imgUrl={bank_card_front_img}/>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='银行卡反面' imgUrl={bank_card_back_img}/>
          {
            this.state.type ? null : <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='银行卡户许可' imgUrl={bank_opening_permit}/>
          }

        </div>

        {/* 审核设置 */}
        <div className={styles.title}>审核设置</div>
        <div className={styles.layout} style={{alignItems: 'center'}}>
          <div className={styles.label}>审核状态：</div>
          <Select defaultValue="1" style={{ width: 120 }}>
            <Option value="1">待审核</Option>
            <Option value="2">拒绝</Option>
            <Option value="3">通过</Option>
          </Select>
        </div>
        <InputBox label='备注原因' value={name} onChange={this.inputChange('name')} />


        <div className={styles.buttonBox}>
          <Button type='primary' className={styles.confirm}>确定</Button>
          <Button>取消</Button>
        </div>
      </div>
    )
  }
}

export default PayAudit
