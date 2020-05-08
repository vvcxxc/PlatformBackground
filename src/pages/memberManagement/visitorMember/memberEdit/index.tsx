import React, { Component } from 'react';
import { Upload, Icon, Input, Button, Modal, message } from 'antd';
import styles from './index.less';
import request from '@/utils/request';
import { router } from 'umi';

const { confirm } = Modal;

interface Props {
    location: any
}
export default class MemberEdit extends Component<Props> {


    state = {
        imageUrl: '',
        loading: false,
        oss_data: {}, // oss参数
        cover_image: "",

        userName: "",
        userPhone: "",
        data: {}
    }

    componentDidMount() {
        this.getOSSData();
        // console.log(this.props);

        let id = this.props.location.query.id;
        request(`/api/v1/tourists/edit/${id}`, {
            method: "GET"
        }).then((res: any) => {
            if (res.status_code == 200) {
                this.setState({
                    imageUrl: res.data.avatar,
                    cover_image: res.data.avatar,
                    userName: res.data.user_name,
                    userPhone: res.data.mobile,
                    data: res.data
                })
            }
        })
    }


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
                    },
                    () => {
                        console.log(this.state);
                    },
                ),
            );
        }
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

    handleChangeUserName = (e: any) => {
        this.setState({
            userName: e.target.value
        })
    }

    handleGoBack = () => {
        const { data, imageUrl, userName } = this.state;
        if (data.avatar != imageUrl || data.user_name != userName) {
            confirm({
                title: '温馨提示',
                content: '检测到你还有修改信息未提交，是否不做保存继续退出。',
                okText: '确认退出',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    router.goBack();
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        } else {
            router.goBack();
        }
    }

    handleSubmit = () => {
        let id = this.props.location.query.id;
        const { cover_image, userName } = this.state;
        request("/api/v1/tourists/update", {
            method: "PUT",
            data: {
                id,
                user_name: userName,
                avatar: cover_image
            }
        }).then((res: any) => {
            if (res.status_code == 200) {
                message.success(res.message);
            } else {
                message.error(res.message);
            }
        })
    }

    render() {
        const { imageUrl, oss_data, userName, userPhone, cover_image } = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
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
            <div className={styles.member_edit}>
                <div className={styles.header}>查看会员信息</div>
                <div className={styles.main}>
                    <div className={styles.title}>会员基本信息</div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>会员头像</div>
                        <div>
                            <Upload
                                style={{ width: '100%' }}
                                listType="picture-card"
                                showUploadList={false}
                                {...uploadProps}
                            >
                                {imageUrl ? (
                                    <img
                                        src={cover_image.indexOf("http://thirdwx.qlogo.cn") != -1 ? cover_image : "http://oss.tdianyi.com/" + cover_image}
                                        alt="avatar"
                                        style={{ width: '100%' }}
                                    />
                                ) : (
                                        uploadButton
                                    )}
                            </Upload>
                        </div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>会员昵称</div>
                        <div>
                            <Input placeholder="请输入会员昵称" value={userName} onChange={this.handleChangeUserName} />
                        </div>
                    </div>
                </div>

                <div className={styles.main}>
                    <div className={styles.title}>会员绑定信息</div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>手机号码</div>
                        <div>{userPhone}</div>
                    </div>
                </div>

                <div style={{ marginTop: 30 }}>
                    <Button type="danger" style={{ width: "100px", marginRight: "80px" }} onClick={this.handleGoBack}>返回列表页</Button>
                    <Button type="danger" style={{ width: "100px" }} onClick={this.handleSubmit}>提交修改</Button>
                </div>
            </div>
        )
    }
}