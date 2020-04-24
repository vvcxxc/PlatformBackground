import React, { Component } from 'react';
import InputBox from '@/components/myComponents/InputBox'
import styles from './index.less';
import { Breadcrumb, Select, Button, Modal } from 'antd';
import { getAuditDetails, putAuditDetails } from '../service';

const { Option } = Select;
export default class AuditDetails extends Component {
  state = {
    visible: false,
    active: '',
    examine_status: 1,
    id: '',
    imgs: [],
    mobile: null,
    name: "",
    remarks: "",
    upgrade_role: ''
  }

  componentDidMount() {
    const id = this.props.location.query.id
    getAuditDetails(id).then(res => {
      console.log(res)
      this.setState({...res.data})
    })
  }

  inputChange = (type: string) => (value: any) => {
    this.setState({ [type]: value })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };


  submit = () => {
    const {remarks, examine_status, imgs, upgrade_role, id} = this.state
    const data = {
      remarks,
      examine_status,
      imgs,
      upgrade_role,
    }
    putAuditDetails(id, data).then (res => {
      console.log(res)
    })
  }

  render() {
    const {active, examine_status, imgs, mobile, name, remarks} = this.state
    return (
      <div className={styles.auditPage}>
        <Breadcrumb>
          <Breadcrumb.Item>社群列表</Breadcrumb.Item>
          <Breadcrumb.Item>审核详情</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.main}>
          <InputBox label='用户姓名' value={name} onChange={this.inputChange('name')} />
          <InputBox label='手机账号' value={mobile} onChange={this.inputChange('mobile')} />
          <div className={styles.layout_box}>
            <div className={styles.layout_label}>活跃度：</div>
            <div className={styles.layout_main}>{active}</div>
          </div>
          <div className={styles.layout_box}>
            <div className={styles.layout_label}>社群等级：</div>
            <div className={styles.layout_main}>
              <Select defaultValue="1" style={{ width: 120 }}>
                <Option value="1">普通会员</Option>
                <Option value="2">普通创客</Option>
                <Option value="3">超级创客</Option>
                <Option value="4">合伙人</Option>
              </Select>
            </div>
          </div>

          <div className={styles.layout_img_box}>
            <div className={styles.layout_label}>提交内容：</div>
            <div className={styles.layout_img}>
              {
                imgs.length ? imgs.map(item => {
                  return <img onClick={this.showModal} src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
                }) : null
              }
            </div>
          </div>

          <div className={styles.layout_box}>
            <div className={styles.layout_label}>审核状态：</div>
            <div className={styles.layout_main}>
              <Select defaultValue={examine_status} style={{ width: 120 }} onChange={this.inputChange('examine_status')}>
                <Option value={1}>通过</Option>
                <Option value={2}>拒绝</Option>
              </Select>
            </div>
          </div>

          <InputBox label='备注原因' value={remarks} onChange={this.inputChange('remarks')} />

          <div>
            <Button style={{ margin: 50 }}>取消</Button>
            <Button type="primary" onClick={this.submit}>确认</Button>
          </div>

          <Modal
            visible={this.state.visible}
            footer={null}
            onCancel={this.handleOk}
          >
            <img src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
          </Modal>


        </div>
      </div>
    )
  }
}
