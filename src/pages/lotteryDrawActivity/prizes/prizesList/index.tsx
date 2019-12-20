import React, { Component } from 'react';
import {
  Table,
  Button,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Select,
  ConfigProvider,
  Divider,
  notification,
  Modal,
  Upload,
} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { connect } from 'dva';
import styles from './index.less';
import router from 'umi/router';
import request from '@/utils/request';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

interface Props {
  form: any;
  dispatch: (opt: any) => any;
  prizesList: any;
}

export default Form.create()(
  connect(({ prizesList }: any) => ({ prizesList }))(
    class PrizesList extends Component<Props> {
      state = {
        dataList: [],
        loading: false,
        total: 0,
        visible: false,
        imageUrl: '',
        ImgLoading: false,
        oss_data: {}, // oss参数
        prizeName: '',
        prizeNum: '',
        prizePrice: '',
      };

      componentDidMount() {
        this.getOSSData();
        console.log(this.props);
      }

      handleSearch = async (e: any) => {
        let activityStatus = this.props.form.getFieldValue('activityStatus');
        let prizeName = this.props.form.getFieldValue('prizeName');
        e.preventDefault();
        await this.props.dispatch({
          type: 'prizesList/setFussyForm',
          payload: {
            activityStatus,
            prizeName,
          },
        });

        const { currentPage, currentPageSize } = this.props.prizesList;

        // this.getListData(activityName, activityStatus, status, currentPage, currentPageSize);
      };

      handleFormReset = async () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        await dispatch({
          type: 'prizesList/resetFussySearch',
        });
      };

      renderForm() {
        return this.renderSimpleForm();
      }

      renderSimpleForm() {
        const {
          form: { getFieldDecorator },
        } = this.props;
        const { prizeName, activityStatus } = this.props.prizesList;
        return (
          <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
            <Row
              gutter={{
                md: 8,
                lg: 24,
                xl: 48,
              }}
            >
              <Col md={8} sm={24}>
                <FormItem label="活动名称">
                  {getFieldDecorator('prizeName', { initialValue: prizeName })(
                    <Input placeholder="请输入" />,
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="活动状态">
                  {getFieldDecorator('activityStatus', { initialValue: activityStatus })(
                    <Select
                      placeholder="请选择"
                      style={{
                        width: '100%',
                      }}
                    >
                      <Option value="0">未生效</Option>
                      <Option value="1">招募中</Option>
                      <Option value="2">已结束</Option>
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <span className={styles.submitButtons}>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button
                    style={{
                      marginLeft: 8,
                    }}
                    onClick={this.handleFormReset}
                  >
                    重置
                  </Button>
                </span>
              </Col>
            </Row>
          </Form>
        );
      }

      addActivity = () => {
        this.setState({
          visible: true,
        });
      };

      // 输入
      handleChangeInp = (type: string) => ({ target: { value } }) => {
        this.setState({ [type]: value });
      };

      getOSSData = () => {
        request.get('http://release.api.supplier.tdianyi.com/api/v2/up').then(res => {
          let { data } = res;
          console.log('data', data);
          this.setState({
            oss_data: {
              expire: data.expire,
              policy: data.policy,
              OSSAccessKeyId: data.accessid,
              success_action_status: 200, //让服务端返回200,不然，默认会返回204
              signature: data.signature,
              callback: data.callback,
              host: data.host,
              key: data.dir,
            },
          });
        });
      };

      transformFile = (file: any) => {
        const { oss_data } = this.state;
        const suffix = file.name.slice(file.name.lastIndexOf('.'));
        const filename = Date.now() + suffix;
        file.url = oss_data.key + filename;

        return file;
      };

      getExtraData = (file: any) => {
        const { oss_data } = this.state;
        return {
          key: file.url,
          policy: oss_data.policy,
          OSSAccessKeyId: oss_data.OSSAccessKeyId,
          success_action_status: 200, //让服务端返回200,不然，默认会返回204
          signature: oss_data.signature,
          callback: oss_data.callback,
          host: oss_data.host,
        };
      };

      beforeUpload = async () => {
        const { oss_data } = this.state;
        const expire = oss_data.expire * 1000;

        if (expire < Date.now()) {
          await this.getOSSData();
        }
        return true;
      };

      // 将图片转为base64
      getBase64 = (img: any, callback: any) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      };

      // 上传图片
      imageChange = (info: any) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          this.getBase64(info.file.originFileObj, (imageUrl: any) =>
            this.setState(
              {
                imageUrl,
                cover_image: info.file.response.data.path,
                loading: false,
              },
              () => {
                console.log(this.state);
              },
            ),
          );
        }
      };

      handleOk = () => {
        console.log(this.state);
      };

      handleCancel = () => {
        this.setState({
          visible: false,
          imageUrl: '',
          prizeName: '',
          prizeNum: '',
          prizePrice: '',
        });
      };

      render() {
        const {
          visible,
          imageUrl,
          ImgLoading,
          oss_data,
          prizeName,
          prizeNum,
          prizePrice,
        } = this.state;
        const uploadButton = (
          <div className={styles.uploadDefault}>
            <Icon type={ImgLoading ? 'loading' : 'plus'} />
            <div className={styles.upload_text}>上传奖品图片，尺寸：364*192</div>
          </div>
        );
        const uploadProps = {
          name: 'file',
          action: oss_data.host,
          onChange: this.imageChange,
          transformFile: this.transformFile,
          data: this.getExtraData,
          beforeUpload: this.beforeUpload,
        };
        return (
          <div className={styles.prizesList}>
            <Modal
              title="添加奖品"
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              width="430px"
            >
              <div className={styles.add_layout}>
                <div className={styles.title}>奖品名称</div>
                <Input
                  size="small"
                  style={{ width: '264px', height: '30px' }}
                  value={prizeName}
                  onChange={this.handleChangeInp('prizeName')}
                />
              </div>
              <div className={styles.add_layout}>
                <div className={styles.title}>奖品库存</div>
                <Input
                  size="small"
                  style={{ width: '264px', height: '30px' }}
                  value={prizeNum}
                  onChange={this.handleChangeInp('prizeNum')}
                />
              </div>
              <div className={styles.add_layout}>
                <div className={styles.title}>奖品价值</div>
                <Input
                  size="small"
                  style={{ width: '264px', height: '30px' }}
                  value={prizePrice}
                  onChange={this.handleChangeInp('prizePrice')}
                />
              </div>
              <div className={styles.add_layout}>
                <div style={{ width: '364px', height: '192px' }}>
                  <Upload
                    style={{ width: '100%' }}
                    listType="picture-card"
                    showUploadList={false}
                    {...uploadProps}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: '364px', height: '192px' }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
              </div>
            </Modal>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Button
              type="primary"
              icon="plus"
              className={styles.addActivity}
              onClick={this.addActivity}
            >
              添加奖品
            </Button>
          </div>
        );
      }
    },
  ),
);
