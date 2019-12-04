import React, { PureComponent } from 'react';
import UploadImage from '../../components/UploadImage';
import styles from './Recognize.less';
import { Progress, Button } from 'antd';

export default class Recognize extends PureComponent {
    state = {
        fileCode: '',
    };

    handleChange(fileList) {
        this.setState({
            fileCode: fileList.length > 0 ? fileList[0].code : '',
        });
    }
    /**
     * 开始比对
     */
    recognize() {
        
    }

    render() {
        const { fileCode } = this.state;
        return (
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <div className={styles.columnRight}>
                        <div className={styles.title}>识别照片</div>
                        <UploadImage
                            maxLimit={1}
                            data={{
                                is_static: true,
                                is_compress: true,
                            }}
                        />
                    </div>
                    <div className={styles.columnCenter}>
                        <div style={{ fontSize: '16px', marginBottom: '20px' }}>
                            VS
                        </div>
                        <Progress
                            strokeColor='#87d068'
                            strokeLinecap='square'
                            type='circle'
                            percent={0}
                        />
                        <div style={{ fontSize: '16px', marginTop: '20px' }}>
                            相似度
                        </div>
                    </div>
                    <div className={styles.columnLeft}>
                        <div className={styles.title}>人脸库</div>
                        <img className={styles.face} />
                    </div>
                </div>
                <div className={styles.button}>
                    <Button
                        size='large'
                        type='primary'
                        disabled={fileCode ? false : true}
                        onClick={this.recognize}>
                        开始比对
                    </Button>
                </div>
            </div>
        );
    }
}
