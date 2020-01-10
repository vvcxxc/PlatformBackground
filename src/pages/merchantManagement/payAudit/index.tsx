import React, { Component } from 'react'
import styles from './index.less'
import { Breadcrumb, Radio, Icon, Select, Button } from 'antd'
import InputBox from '@/components/myComponents/InputBox'
import UploadBox from '@/components/myComponents/uploadBox'
import router from 'umi/router'
const { Option } = Select;
class PayAudit extends Component {
  state = {
    address: ''
  }


  radioChange = (e: any) => {
    console.log(e.target.value)
  }

  inputChange = (type: string) => (value: any) => {
    this.setState({ [type]: value })
  }

  imageChange = (type: string) => (path: string) => {
    console.log(type, path)
  }

  render (){
    const { address } = this.state

    return (
      <div className={styles.page}>
        <Breadcrumb>
          <Breadcrumb.Item><a onClick={() => router.goBack()}>商家审核</a></Breadcrumb.Item>
          <Breadcrumb.Item>支付审核</Breadcrumb.Item>
        </Breadcrumb>

        <div className={styles.title}>基本信息</div>
        <div className={styles.radioBox}>
          <Radio.Group defaultValue="a" buttonStyle="solid" onChange={this.radioChange}>
            <Radio.Button value="a">双乾通道</Radio.Button>
            <Radio.Button value="b">服务商通道</Radio.Button>
            <Radio.Button value="c">小微通道</Radio.Button>
          </Radio.Group>
        </div>
        <div className={styles.layout}>
          <div>提交双乾审核：已提交</div>
          <Button type='primary' style={{marginLeft: 30}}>提交数据</Button>
        </div>
        <div className={styles.layout}>
          <div className={styles.status}>认证状态：认证失败</div>
          <div className={styles.reason}>返回信息：组织结构代码证副本，编号错误</div>
        </div>

        <div className={styles.radioBox}>
          <Radio.Group >
            <Radio value={1}>个人商户</Radio>
            <Radio value={2}>企业商户</Radio>
          </Radio.Group>
        </div>

        {/* 门店信息 */}
        <div className={styles.title}>门店信息</div>
        <InputBox label='门店地址' onChange={this.inputChange('address')} value={address} />
        <InputBox label='行业/经营品类' onChange={this.inputChange('address')} value={address} />

        {/* 身份证信息 */}
        <div className={styles.title}>身份证信息</div>
        <InputBox label='姓名' onChange={this.inputChange('address')} value={address} />
        <InputBox label='身份证号' onChange={this.inputChange('address')} value={address} />
        <InputBox label='有效期' onChange={this.inputChange('address')} value={address} />
        <div className={styles.imageLayout}>
          <div className={styles.label}>证件照片：</div>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='身份证正面'/>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='身份证反面'/>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='手持身份证'/>
        </div>

        {/* 营业执照 */}
        <div className={styles.title}>身份证信息</div>
        <InputBox label='营业执照名称' onChange={this.inputChange('address')} value={address} />
        <InputBox label='营业执照号' onChange={this.inputChange('address')} value={address} />
        <InputBox label='有效期' onChange={this.inputChange('address')} value={address} />
        <div className={styles.imageLayout}>
          <div className={styles.label}>证件照片：</div>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='营业执照图'/>
        </div>

        {/* 银行卡信息 */}
        <div className={styles.title}>银行卡信息</div>
        <InputBox label='银行卡号' onChange={this.inputChange('address')} value={address} />
        <InputBox label='开户人' onChange={this.inputChange('address')} value={address} />
        <InputBox label='支行' onChange={this.inputChange('address')} value={address} />
        <div className={styles.imageLayout}>
          <div className={styles.label}>证件照片：</div>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='银行卡正面'/>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='银行卡反面'/>
          <UploadBox style={{margin: '0 20px'}} onChange={this.imageChange} title='银行卡户许可'/>
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
