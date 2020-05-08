import React, { Component } from 'react';
import { Upload, Icon, message, Button, Modal, Input } from 'antd';
import styles from './index.less';
import request from '@/utils/request';
import { router } from 'umi';

const { confirm } = Modal;
const { TextArea } = Input;

interface Props {
    location: any
}

export default class MemberDetail extends Component<Props> {

    state = {
        avatar: '',  // 会员头像
        user_name: '', // 会员昵称
        mobile: '', // 手机号码
        sex: null, // 性别
        byear: '', // 生日
        bmonth: '',
        bday: '',
        address_detail: '', // 所属地区
        province_id: '', // 省份
        city_id: '',  // 城市
        is_effect: null, //账号状态
        wx_openid: "",  // 微信openid	
        xcx_openid: "", // 小程序openid	
        ali_user_id: "" // 支付宝userid	
    }

    componentDidMount() {
        let id = this.props.location.query.id;
        request(`/api/v1/users/${id}`, {
            method: "GET"
        }).then((res: any) => {
            // console.log('res', res);
            if (res.status_code == 200) {
                this.setState({
                    avatar: res.data.avatar,
                    user_name: res.data.user_name,
                    mobile: res.data.mobile,
                    sex: res.data.sex,
                    byear: res.data.byear,
                    bmonth: res.data.bmonth,
                    bday: res.data.bday,
                    address_detail: res.data.address_detail,
                    province_id: res.data.province_id,
                    city_id: res.data.city_id,
                    is_effect: res.data.is_effect,
                    wx_openid: res.data.wx_openid,
                    xcx_openid: res.data.xcx_openid,
                    ali_user_id: res.data.ali_user_id,
                })
            }
        })
    }



    handleShowID = (title: any, idString: any) => {
        // console.log(idString);
        // confirm({
        //     title,
        //     content: '检测到你还有修改信息未提交，是否不做保存继续退出。',
        //     okText: '确认退出',
        //     okType: 'danger',
        //     cancelText: '取消',
        //     onOk() {

        //     },
        //     onCancel() {

        //     },
        // });

        if (idString) {
            confirm({
                title,
                content: <TextArea rows={4} value={idString} readOnly id="linkUrl" />,
                okText: '复制并关闭',
                okType: 'danger',
                cancelText: '关闭',
                onOk() {
                    let ele = document.getElementById('linkUrl');
                    ele.select();
                    document.execCommand("copy");
                    message.success('复制成功');
                },
                onCancel() { },
            });
        } else {
            Modal.info({
                title,
                content: (
                    <div>
                        <p>暂无绑定记录</p>
                    </div>
                ),
                okText: "关闭",
                onOk() { },
            });
        }
    }




    render() {
        const {
            avatar,
            user_name,
            mobile,
            sex,
            byear,
            bmonth,
            bday,
            address_detail,
            province_id,
            city_id,
            is_effect,
            wx_openid,
            xcx_openid,
            ali_user_id
        } = this.state;
        return (
            <div className={styles.member_detail}>
                <div className={styles.header}>查看活动奖池</div>
                <div className={styles.main}>
                    <div className={styles.title}>会员基本信息</div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>会员头像</div>
                        <div>
                            <Upload
                                style={{ width: '100%' }}
                                listType="picture-card"
                                showUploadList={false}
                                disabled
                            >
                                <img
                                    src={avatar}
                                    alt=""
                                    style={{ width: '100%' }}
                                />
                            </Upload>
                        </div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>会员昵称</div>
                        <div>{user_name}</div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>手机号码</div>
                        <div>{mobile}</div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>性别</div>
                        <div>{sex == 0 ? "女" : sex == -1 ? "未填写" : "男"}</div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>生日</div>
                        <div>{byear + "/" + bmonth + "/" + bday}</div>
                    </div>
                    {/* <div className={styles.item_layout}>
                        <div className={styles.item_title}>所属地区</div>
                        <div>{province_id} {city_id} {address_detail}</div>
                    </div> */}
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>账号状态</div>
                        <div>{is_effect == 0 ? "冻结" : "正常"}</div>
                    </div>
                </div>

                <div className={styles.main}>
                    <div className={styles.title}>会员基本信息</div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>微信公众号open-id</div>
                        <div>
                            <a onClick={this.handleShowID.bind(this, "微信公众号open-id", wx_openid)}>{wx_openid == "" ? "未绑定" : "已绑定"}</a>
                        </div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>微信小程序open-id</div>
                        <div>
                            <a onClick={this.handleShowID.bind(this, "微信小程序open-id", xcx_openid)}>{xcx_openid == "" ? "未绑定" : "已绑定"}</a>
                        </div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>支付宝user-id</div>
                        <div>
                            <a onClick={this.handleShowID.bind(this, "支付宝user-id", ali_user_id)}>{ali_user_id == "" ? "未绑定" : "已绑定"}</a>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 30 }}>
                    <Button type="danger" style={{ width: "100px" }} onClick={() => router.goBack()}>关闭</Button>
                </div>
            </div>
        )
    }
}