import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import styles from './index.less';
import request from '@/utils/request';


export default class MemberDetail extends Component {

    componentDidMount() {
        this.getOSSData();
        // console.log(this.props);
    }

    state = {
        imageUrl: '',
        loading: false,
        oss_data: {}, // oss参数
        cover_image: ""
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

    render() {
        const { imageUrl, oss_data } = this.state;
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
                                {...uploadProps}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
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
                        <div>实物奖品</div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>手机号码</div>
                        <div>232</div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>性别</div>
                        <div>232</div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>生日</div>
                        <div>232</div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>所属地区</div>
                        <div>232</div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>账号状态</div>
                        <div>232</div>
                    </div>
                </div>

                <div className={styles.main}>
                    <div className={styles.title}>会员基本信息</div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>微信公众号open-id</div>
                        <div>1</div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>微信小城open-id</div>
                        <div>实物奖品</div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>支付宝user-id</div>
                        <div>232</div>
                    </div>
                </div>
            </div>
        )
    }
}