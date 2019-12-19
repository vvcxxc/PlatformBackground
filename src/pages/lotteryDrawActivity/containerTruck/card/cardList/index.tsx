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
  cardList: any;
}

export default Form.create()(
  connect(({ cardList }: any) => ({ cardList }))(
    class CardList extends Component<Props> {
      state = {
        dataList: [],
        loading: false,
        total: 0,
      };

      componentDidMount() {
        console.log(this.props);
      }

      handleSearch = async (e: any) => {
        let activityStatus = this.props.form.getFieldValue('activityStatus');
        let cardName = this.props.form.getFieldValue('cardName');
        e.preventDefault();
        await this.props.dispatch({
          type: 'cardList/setFussyForm',
          payload: {
            activityStatus,
            cardName,
          },
        });

        const { currentPage, currentPageSize } = this.props.cardList;

        // this.getListData(activityName, activityStatus, status, currentPage, currentPageSize);
      };

      handleFormReset = async () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        await dispatch({
          type: 'cardList/resetFussySearch',
        });
      };

      renderForm() {
        return this.renderSimpleForm();
      }

      renderSimpleForm() {
        const {
          form: { getFieldDecorator },
        } = this.props;
        const { cardName, activityStatus } = this.props.cardList;
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
                <FormItem label="卡券名称">
                  {getFieldDecorator('cardName', { initialValue: cardName })(
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

      render() {
        return (
          <div>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
          </div>
        );
      }
    },
  ),
);
