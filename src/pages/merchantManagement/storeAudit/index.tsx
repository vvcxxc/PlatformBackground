import React, { Component } from 'react'
import styles from './index.less'
import { Breadcrumb, Upload, Icon, Select, Button } from 'antd'
import InputBox from '@/components/myComponents/InputBox'
import UploadBox from '@/components/myComponents/uploadBox'
import router from 'umi/router'
const { Option } = Select;
class StoreAudit extends Component {
  state = {
    name: '',
    ImgLoading: false,
  }

  inputChange = (type: string) => (value: any) => {
    this.setState({ [type]: value })
  }

  imageChange = (type: string) => (path: string) => {
    console.log(type, path)
  }

  render() {
    const { name } = this.state
    return (
      <div className={styles.page}>
        <Breadcrumb>
          <Breadcrumb.Item><a onClick={() => router.goBack()}>门店审核</a></Breadcrumb.Item>
          <Breadcrumb.Item>门店审核</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.title}>门店信息</div>
        <InputBox label='门店名称' value={name} onChange={this.inputChange('name')} />
        <InputBox label='手机号码' value={name} onChange={this.inputChange('name')} />
        <InputBox label='门店地址' value={name} onChange={this.inputChange('name')} />
        <InputBox label='门店电话' value={name} onChange={this.inputChange('name')} />
        <InputBox label='行业/经营品类' value={name} onChange={this.inputChange('name')} />
        <InputBox label='邮箱' value={name} onChange={this.inputChange('name')} />

        <div style={{marginTop: 10}}>
          <div className={styles.layout}>
            <div className={styles.label}>门头照：</div>
            <UploadBox onChange={this.imageChange('store')} imgUrl='http://oss.tdianyi.com/front/wPTnTHEsRh37XSe2FMDDBfjhfBtRrjfn.png' />
            <div className={styles.layout}>
              <div className={styles.label}>环境照：</div>
              <div style={{marginRight: 20}}>

              <UploadBox onChange={this.imageChange('store2')}/>
              </div>
              <UploadBox onChange={this.imageChange('store3')}/>

            </div>
          </div>
        </div>

        <div className={styles.title}>门店设置</div>
        <InputBox label='所属商圈' value={name} onChange={this.inputChange('name')} />
        <InputBox label='商家手续费' value={name} onChange={this.inputChange('name')} />
        <InputBox label='免手续费额度' value={name} onChange={this.inputChange('name')} />
        <InputBox label='商家券费率' value={name} onChange={this.inputChange('name')} />
        <InputBox label='商家广告费' value={name} onChange={this.inputChange('name')} />

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
export default StoreAudit
