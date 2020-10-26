import React, { PureComponent } from 'react';
import { Upload, Icon, message } from 'antd';
import PropTypes from 'prop-types';
import config from '../../../config/pro.env';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import { formatMessage } from 'umi';

const imageType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

class UploadImage extends PureComponent {
    constructor(props) {
        super(props);

        const value = props.fileList || [];
        this.state = {
            fileList: value,
            viewVisible: false,
            viewIndex: 0,
        };
    }

    static propTypes = {
        uploadText: PropTypes.string,
        data: PropTypes.object,
        multiple: PropTypes.bool, //多选
        maxLimit: PropTypes.number, //上传数量 为0不限制
    };

    static defaultProps = {
        uploadText: formatMessage({ id: 'label.upload' }),
        data: {
            folder_name: '',
            is_static: true,
            is_compress: true,
            is_thumb: true,
            // thumb_w: 200,
            // thumb_h: 300
        },
        multiple: false,
        maxLimit: 0,
    };

    //上传限制
    beforeUpload = (file, fileList) => {
        const { maxLimit } = this.props;
        //限制上传数据
        let isMaxLimit = true;
        if (maxLimit > 0) {
            let file_num = this.state.fileList.length + fileList.length;
            if (file_num > maxLimit) {
                message.error(
                    formatMessage({ id: 'upload.validation.limit-number' })
                );
                isMaxLimit = false;
            }
        }

        const isImage = imageType.some((image) => image == file.type);
        if (!isImage) {
            message.error(
                formatMessage({ id: 'upload.validation.limit-image-type' })
            );
        }
        const isSizeLimit = file.size / 1024 / 1024 < 20;
        if (!isSizeLimit) {
            message.error(
                formatMessage({ id: 'upload.validation.limit-size' })
            );
        }
        return isImage && isSizeLimit && isMaxLimit;
    };

    /**上传图片 */
    handleChange = ({ file, fileList }) => {
        const { onChange } = this.props;

        //文件上传完成时
        if (file.status == 'done') {
            const res = file.response;
            if (res.code) {
                message.error(res.message);
            }
        }

        //转换为自定义文件对象
        fileList = fileList.map((file) => {
            if (file.response) {
                if (file.response.code == 0) {
                    const { code, url, thumb_url } = file.response.data;
                    return {
                        uid: file.uid,
                        code: code,
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        url: url,
                        src: url,
                        status: 'done',
                        thumbUrl: thumb_url,
                    };
                } else {
                    file.status = 'error';
                }
            }
            return file;
        });
        //过滤文件
        // fileList = fileList.filter(file => {
        //     return !file.status|| file.status == 'done' || file.status == 'uploading'
        // })

        this.setState({ fileList });

        if (!file.status || file.status == 'done') {
            //返回成功状态的文件列表
            if (onChange) onChange(fileList);
        }
    };

    /**查看图片 */
    handlePreview = (file) => {
        let index = 0;
        if (this.props.maxLimit != 1) {
            this.state.fileList.forEach((item, i) => {
                if (item.uid == file.uid) {
                    index = i;
                }
            });
        }
        this.setState({
            viewVisible: true,
            viewIndex: index,
        });
    };

    /**移除图片 */
    handleRemove = (file) => {
        const { onChange } = this.props;
        let list = this.state.fileList.filter((item) => {
            if (item.uid === file.uid) {
                return false;
            }
            return true;
        });
        if (onChange) onChange(list);
    };

    render() {
        const { data, uploadText, maxLimit, multiple } = this.props;
        const uploadButton = (
            <div>
                <Icon type='plus'></Icon>
                <div className='ant-upload-text'>{uploadText}</div>
            </div>
        );
        return (
            <div>
                <Upload
                    name='file'
                    multiple={multiple}
                    data={data}
                    listType='picture-card'
                    showUploadList={true}
                    action={process.env.API_URL + '/core/file/upload'}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                    headers={{ token: localStorage.getItem('token') }}
                    fileList={this.state.fileList}
                    onRemove={this.handleRemove}
                    onPreview={this.handlePreview}>
                    {this.state.fileList.length >= maxLimit && maxLimit != 0
                        ? null
                        : uploadButton}
                </Upload>
                <Viewer
                    images={this.state.fileList}
                    onClose={() => {
                        this.setState({ viewVisible: false });
                    }}
                    activeIndex={this.state.viewIndex}
                    visible={this.state.viewVisible}></Viewer>
            </div>
        );
    }
}

export default UploadImage;
