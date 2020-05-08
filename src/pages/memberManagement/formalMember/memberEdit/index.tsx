import React, { Component } from 'react';
import { Upload, Icon, message, Input, Select, DatePicker, Radio, Cascader, Button } from 'antd';
import styles from './index.less';
import request from '@/utils/request';
import areaOpts from './dataCity';
import moment from 'moment';
interface Props {
    location: any
}


const { Option } = Select;

export default class MemberEdit extends Component<Props> {

    state = {
        imageUrl: '',
        loading: false,
        oss_data: {}, // oss参数
        cover_image: "",


        userName: "",
        sex: 0,  // 0 女 1 男
        byear: 0,
        bmonth: 0,
        bday: 0,
        countStatus: 0,   //1 - 正常 0 - 冻结
        data: {}
    }

    componentDidMount() {
        this.getOSSData();
        // console.log(this.props);

        let id = this.props.location.query.id;
        request(`/api/v1/users/edit/${id}`, {
            method: "GET"
        }).then((res: any) => {
            if (res.status_code == 200) {
                this.setState({
                    imageUrl: res.data.avatar,
                    cover_image: res.data.avatar,
                    userName: res.data.user_name,
                    data: res.data,
                    sex: res.data.sex,
                    byear: res.data.byear,
                    bmonth: res.data.bmonth,
                    bday: res.data.bday,
                    countStatus: res.data.is_effect
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

    handleChangeSex = (e: any) => {
        this.setState({
            sex: e
        })
    }

    handleChangeBirthday = (date: any, dateString: any) => {
        console.log(moment(date).toObject())
    }

    handleChangeArea = (v, k) => {
        console.log(v, k)
    }

    handleChangeStatus = (e: any) => {
        this.setState({
            countStatus: e.target.value
        })
    }

    render() {
        const { imageUrl, oss_data, userName, sex, countStatus } = this.state;
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
                        <div>
                            <Input placeholder="请输入会员昵称" value={userName} onChange={this.handleChangeUserName} />
                        </div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>性别</div>
                        <div>
                            <Select value={sex} style={{ width: 120 }} onChange={this.handleChangeSex}>
                                <Option value={1}>男</Option>
                                <Option value={0}>女</Option>
                            </Select>

                        </div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>生日</div>
                        <div>
                            <DatePicker onChange={this.handleChangeBirthday} />
                        </div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>所属地区</div>
                        <div>
                            <Cascader
                                // defaultValue={['zhejiang', 'hangzhou', 'xihu']}
                                options={areaOpts}
                                onChange={this.handleChangeArea}
                                style={{ width: '300px' }}
                            />
                        </div>
                    </div>
                    <div className={styles.item_layout}>
                        <div className={styles.item_title}>账号状态</div>
                        <div>
                            <Radio.Group value={countStatus} onChange={this.handleChangeStatus}>
                                <Radio value={1}>正常</Radio>
                                <Radio value={0}>冻结</Radio>
                            </Radio.Group>
                        </div>
                    </div>


                </div>
                <div style={{ marginTop: 30 }}>
                    <Button type="danger" style={{ width: "100px", marginRight: "80px" }} >返回列表页</Button>
                    <Button type="danger" style={{ width: "100px" }} >提交修改</Button>
                </div>
            </div >
        )
    }
}