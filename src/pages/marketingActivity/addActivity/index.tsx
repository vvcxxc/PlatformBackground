import React, {Component} from 'react'
import styles from './index.less';
import { Input, Select, DatePicker, Upload, Icon, List  } from 'antd'
const { Option } = Select;
const { RangePicker } = DatePicker;
import locale from 'antd/es/date-picker/locale/zh_CN';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

export default class AddActivity extends Component {
  state = {
    imageUrl: '',
    loading: false,
  };

  // 选择商圈
  selectArea = (value: string) => {
    console.log(`selected ${value}`);
  }

  // 选择日期
  selectDate = (value: string) => {
    console.log(value)
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
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, ((imageUrl: string) =>
        this.setState({
          imageUrl,
          loading: false,
        })),
      );
    }
  }

  // 使用须知删除操作
  deleteItem = (index: number) => {
    console.log(index)
  }


  render (){

    const { imageUrl } = this.state

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

        <div className={styles.add_layout}>
          <div className={styles.title}>设置活动名称</div>
          <Input size='small' style={{width: '40%'}}/>
        </div>

        <div className={styles.add_layout}>
          <div className={styles.title}>设置活动区域</div>
          <Select defaultValue="lucy" style={{ width: 120 }} size='small' onChange={this.selectArea}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>

        <div className={styles.add_layout}>
          <div className={styles.title}>活动招募时间</div>
          <RangePicker
            size='small'
            onChange={this.selectDate}
            locale={locale}
          />
        </div>

        <div className={styles.add_layout}>
          <div className={styles.title}>商家卡券限制</div>
          最多
          <Input size='small' style={{width: '100px', margin: '0 5px'}} type='number'/>
          张
        </div>

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

        <div className={styles.add_layout}>
          <div className={styles.title}>设置招募规则</div>
          <div className={styles.ruleList}>
            <List
              bordered
              dataSource={data}
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
          </div>
        </div>


      </div>
    )
  }
}
