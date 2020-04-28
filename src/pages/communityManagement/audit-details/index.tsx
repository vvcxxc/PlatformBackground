import React, { Component } from 'react';
import InputBox from '@/components/myComponents/InputBox'
import styles from './index.less';
import { Breadcrumb, Select, Button, Modal, notification } from 'antd';
import { getAuditDetails, putAuditDetails } from '../service';
import { router } from 'umi';

const { Option } = Select;
export default class AuditDetails extends Component {
  state = {
    visible: false,
    active_value: '',
    examine_status: 1,
    id: '',
    imgs: [],
    mobile: null,
    name: "",
    remarks: "",
    upgrade_role: '',
    user_group: [],
    grade: '',
    invitation_code: ''
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
    const {remarks, examine_status, id, grade,invitation_code, mobile} = this.state
    const data = {
      remarks,
      examine_status,
      upgrade_role: grade,
      id,
      invitation_code,
      mobile
    }
    putAuditDetails(id, data).then (res => {
      console.log(res)
      if(res.status_code == 200){
        notification.success({message: res.message})
        router.goBack()
      }else {
        notification.error({message: res.message})
      }
    })
  }

  render() {
    const {active_value, examine_status, imgs, mobile, name, remarks, user_group,upgrade_role ,grade} = this.state
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
            <div className={styles.layout_main}>{active_value}</div>
          </div>
          <div className={styles.layout_box}>
            <div className={styles.layout_label}>社群等级：</div>
            <div className={styles.layout_main}>
              <Select value={grade} style={{ width: 120 }} onChange={this.inputChange('grade')}>
                {/* <Option value="1">普通会员</Option>
                <Option value="2">普通创客</Option>
                <Option value="3">超级创客</Option>
                <Option value="4">合伙人</Option> */}
                {
                  user_group.map(item => {
                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                  })
                }
              </Select>
            </div>
          </div>

          <div className={styles.layout_img_box}>
            <div className={styles.layout_label}>提交内容：</div>
            <div className={styles.layout_img}>
              {
                imgs.length ? JSON.parse(imgs).map((item:string, index: number) => {
                  return <img key={index} onClick={this.showModal} src={'http://oss.tdianyi.com/'+item} alt="" />
                }) : null
              }
            </div>
          </div>

          <div className={styles.layout_box}>
            <div className={styles.layout_label}>审核状态：</div>
            <div className={styles.layout_main}>
              <Select value={examine_status} style={{ width: 120 }} onChange={this.inputChange('examine_status')}>
                <Option value={1}>通过</Option>
                <Option value={2}>拒绝</Option>
              </Select>
            </div>
          </div>

          <InputBox label='备注原因' value={remarks} onChange={this.inputChange('remarks')} />

          <div>
            <Button style={{ margin: 50 }} onClick={()=> router.goBack()}>取消</Button>
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
