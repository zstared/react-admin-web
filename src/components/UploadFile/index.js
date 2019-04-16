import React, { PureComponent } from 'react'
import { Upload, Icon, message, Button } from 'antd'
import PropTypes from 'prop-types'
import config from '../../../config/base'
import styles from './index.less';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import { download } from '../../services/file'
import {formatMessage} from 'umi/locale'

const imageType = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif'
]

class UploadFile extends PureComponent {

    constructor(props) {
        super(props);

        const value = props.fileList || [];
        this.state = {
            fileList: value,
            viewVisible: false,
            viewIndex: 0,
            images:this.filterImages(value)
        };
    }

    static propTypes = {
        style: PropTypes.oneOf(['normal','card', 'card-inline']),
        uploadText: PropTypes.string,
        data: PropTypes.object,
        multiple: PropTypes.bool,//多选
        maxLimit: PropTypes.number,//上传数量 为0不限制
    };

    static defaultProps = {
        style: 'normal',
        uploadText: formatMessage({id:'button.upload'}),
        data: {
            folder_name: '',
            is_static: false,
            is_thumb: true,
            // thumb_w: 200,
            // thumb_h: 300
        },
        multiple: false,
        maxLimit: 0,
    };
    
    /**过滤图片文件 */
    filterImages=(fileList)=>{
        return fileList.filter((item)=>{
            return imageType.some((type)=>{
                if(type===item.type) return true
            })
        })
    }

    //上传限制
    beforeUpload = (file, fileList) => {

        const { maxLimit } = this.props;
        //限制上传数据
        let isMaxLimit = true;
        if (maxLimit > 0) {
            let file_num = this.state.fileList.length + fileList.length;
            if (file_num > maxLimit) {
                message.error(formatMessage({id:'upload.validation.limit-number'}));
                isMaxLimit = false;
            }
        }

        const isSizeLimit = file.size / 1024 / 1024 < 5;
        if (!isSizeLimit) {
            message.error(formatMessage({id:'upload.validation.limit-size'}));
        }


        return isSizeLimit && isMaxLimit;
    }

    /**上传图片 */
    handleChange = ({ file, fileList }) => {
        const { onChange } = this.props;
        //文件上传完成时
        if (file.status == "done") {
            const res = file.response;
            if (res.code) {
                message.error(res.message)
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
                    }
                } else {
                    file.status = 'error'
                }
            }
            return file;
        });
        //过滤文件

        fileList = fileList.filter(file => {
            return file.status == "done" || "uploading"
        })

        this.setState({ fileList,images:this.filterImages(fileList) });

        if (file.status == "done") {
            //返回成功状态的文件列表
            onChange(fileList)
        }
    }

    /**查看图片 */
    handlePreview = (file) => {

        if (imageType.some((item) => { if (item == file.type) return true })) {
            let index = 0;
            if (this.props.maxLimit != 1) {
                this.state.images.forEach((item, i) => {
                    if (item.uid == file.uid) {
                        index = i;
                    }
                })
            }
            this.setState({
                viewVisible: true,
                viewIndex: index
            })
        } else {
            download(file.code)
        }
    }

    /**移除图片 */
    handleRemove = (file) => {
        const { onChange } = this.props;
        let list = this.state.fileList.filter(item => {
            if (item.uid === file.uid) {
                return false
            }
            return true;
        })
        onChange(list)
    }

    render() {
        const { data, uploadText, multiple, style } = this.props;
        return (
            <div>
                <Upload
                    name="file"
                    multiple={multiple}
                    data={data}
                    listType={style=='normal'?null:"picture"}
                    className={style == "card-inline" ? styles.listInline : null}
                    showUploadList={true}
                    action={config.api_url + '/core/file/upload'}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                    headers={{ token: localStorage.getItem('token') }}
                    fileList={this.state.fileList}
                    onRemove={this.handleRemove}
                    onPreview={this.handlePreview}
                >
                    <Button>
                        <Icon type="upload" /> {uploadText}
                    </Button>
                </Upload>
                <Viewer
                    images={this.state.images}
                    onClose={() => { this.setState({ viewVisible: false }) }}
                    activeIndex={this.state.viewIndex}
                    visible={this.state.viewVisible}>
                </Viewer>
            </div>
        )
    }
}

export default UploadFile