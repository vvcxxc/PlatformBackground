import React, {Component} from 'react'
import styles from './index.less';
import { Input, Select, DatePicker, Upload, Icon, List, Button, notification  } from 'antd'
const { Option } = Select;
const { RangePicker } = DatePicker;
import locale from 'antd/es/date-picker/locale/zh_CN';
import upload from '@/services/oss'
import moment from 'moment'
import { router } from 'umi';
import request from '@/utils/request'

export default class AddActivity extends Component {
  state = {
    imageUrl: '',
    loading: false,
    rules: [], // 规则
    name: '', // 活动名称
    num: 0, // 卡券限制
    brief: '', // 简介
    cover_image: '', // 活动图片
    area_id: '', // 区域id
    start_date: '', // 开始时间
    end_date: '', // 结束时间
    area_list: [], // 商圈

  };
  componentDidMount (){
    request('/api/common/area',{method: 'get'}).then(res => {
      this.setState({area_list: res.data})
    })
  }

  // 选择商圈
  selectArea = (value: string) => {
    this.setState({area_id:value })
  }

  // 选择日期
  selectDate = (time: any) => {
    this.setState({
      start_date: moment(time[0]).format('YYYY-MM-DD'),
      end_date: moment(time[1]).format('YYYY-MM-DD')
    })
  }

  // 将图片转为base64
  getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  // 上传图片
  imageChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj,(imageUrl: string) => {
        upload(imageUrl).then(res => {
          this.setState({
            imageUrl,
            loading: false,
            cover_image: res.data.path
          })
        }).catch(err => {
          this.setState({imageUrl: '', loading: false})
        })
      });
    }
  }

  // 使用须知删除操作
  deleteItem = (index: number) => {
    let {rules} = this.state
    let list:Array<string> = []
    rules.forEach((item,idx)=>{
      if(idx != index){
        list.push(rules[idx])
      }
    })
    this.setState({rules: list})
  }

  // 添加使用规则
  addRules = () => {
    let rule = document.getElementById('rule')
    let value = rule.value
    let {rules} = this.state
    rules.push(value);
    this.setState({rules})
  }

  // 输入
  inputChange = (type: string) => ({ target: { value } }) => {
    this.setState({[type]: value})
  }

  // 发布活动
  submit = () => {
    const {name, num, brief, cover_image, start_date, end_date, rules, area_id} = this.state
    if(name && num && brief && cover_image && start_date && end_date && rules && area_id){
      request('/api/v1/activity/recruit',{
        method: 'post',
        data: {
          name,
          area_id,
          start_date,
          end_date,
          card_num: num,
          cover_image,
          rules,
          introduce: brief
        }
      }).then(res => {
        if(res.status_code == 201){
          notification.success({
            message: res.message,
          });
          router.goBack()
        }
      })
    }else {
      notification.error({
        message: '请将信息填写完整',
      });
    }
  }


  render (){

    const { imageUrl, rules, area_list } = this.state
    const uploadButton = (
      <div className={styles.uploadDefault}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );

    return (
      <div className={styles.addPage}>
        <div className={styles.header}>
          配置活动招募设置
        </div>
        {/* 活动名称 */}
        <div className={styles.add_layout}>
          <div className={styles.title}>设置活动名称</div>
          <Input size='small' style={{width: '650px'}} onChange={this.inputChange('name')}/>
        </div>
        {/* 活动区域 */}
        <div className={styles.add_layout}>
          <div className={styles.title}>设置活动区域</div>
          <Select defaultValue="请选择商圈" style={{ width: 200 }} size='small' onChange={this.selectArea}>
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option> */}
            {
              area_list.length ? area_list.map(item => {
              return <Option value={item.id} key={item.id}>{item.name}</Option>
              }) : null
            }
          </Select>
        </div>
        {/* 活动时间 */}
        <div className={styles.add_layout}>
          <div className={styles.title}>活动招募时间</div>
          <RangePicker
            size='small'
            onChange={this.selectDate}
            locale={locale}
          />
        </div>
        {/* 卡券限制 */}
        <div className={styles.add_layout}>
          <div className={styles.title}>商家卡券限制</div>
          最多
          <Input size='small' onChange={this.inputChange('num')} style={{width: '100px', margin: '0 5px'}} type='number'/>
          张
        </div>
        {/* 上传图片 */}
        <div className={styles.add_layout}>
          <div className={styles.title}>设置招募图片</div>
          <div style={{width: '248px', height: '122px'}}>
            <Upload
              style={{width: '248px', height: '122px'}}
              listType='picture-card'
              showUploadList={false}
              onChange={this.imageChange}
            >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '248px', height: '122px'}}/> : uploadButton}
            </Upload>
          </div>
        </div>
        {/* 招募规则 */}
        <div className={styles.add_layout}>
          <div className={styles.title}>设置招募规则</div>
          <div className={styles.ruleList}>
            <List
              bordered
              locale={{emptyText: '暂无招募规则'}}
              dataSource={rules}
              size='small'
              renderItem={(item,index) => (
                <List.Item>
                 <div className={styles.item_flex}>
                  <div>{item}</div>
                  <Icon type="delete" onClick={this.deleteItem.bind(this,index)} />
                 </div>
                </List.Item>
              )}
            >
            </List>
            <div className={styles.addRule}>
              <Input style={{width: '90%'}} id='rule'/>
              <Button size='default' onClick={this.addRules}>添加</Button>
            </div>
          </div>
        </div>
        {/* 活动简介 */}
        <div className={styles.add_layout}>
          <div className={styles.title}>输入活动简介</div>
          <Input size='small' style={{width: '650px'}} onChange={this.inputChange('brief')}/>
        </div>
        {/* 按钮 */}
        <div className={styles.Buttons}>
          <Button style={{marginRight: '100px', width: '100px'}} type="primary" onClick={this.submit}>发布活动</Button>
          <Button style={{marginRight: '40px', width: '100px'}} onClick={()=>{router.goBack()}}>取消</Button>
        </div>
      </div>
    )
  }
}
