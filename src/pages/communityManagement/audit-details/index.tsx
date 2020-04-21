import React, { Component } from 'react';
import InputBox from '@/components/myComponents/InputBox'
import styles from './index.less';
import { Breadcrumb, Select, Button, Modal } from 'antd';
const { Option } = Select;
export default class AuditDetails extends Component {
  state = {
    visible: false
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


  render() {
    return (
      <div className={styles.auditPage}>
        <Breadcrumb>
          <Breadcrumb.Item>社群列表</Breadcrumb.Item>
          <Breadcrumb.Item>审核详情</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.main}>
          <InputBox label='用户姓名' value={22} onChange={this.inputChange('remarks')} />
          <InputBox label='手机账号' value={22} onChange={this.inputChange('remarks')} />
          <div className={styles.layout_box}>
            <div className={styles.layout_label}>活跃度：</div>
            <div className={styles.layout_main}>1000</div>
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
              <img onClick={this.showModal} src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
              <img src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
              <img src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
              <img src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
              <img src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
              <img src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
              <img src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
              <img src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
              <img src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
              <img src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
              <img src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=489293176,3448257280&fm=85&s=CDC1AC440C06077412C18D980300C08B" alt="" />
            </div>
          </div>

          <div className={styles.layout_box}>
            <div className={styles.layout_label}>审核状态：</div>
            <div className={styles.layout_main}>
              <Select defaultValue="1" style={{ width: 120 }}>
                <Option value="1">待审核</Option>
                <Option value="2">通过</Option>
                <Option value="3">拒绝</Option>
              </Select>
            </div>
          </div>

          <InputBox label='备注原因' value={22} onChange={this.inputChange('remarks')} />

          <div>
            <Button style={{ margin: 50 }}>取消</Button>
            <Button type="primary">确认</Button>
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
