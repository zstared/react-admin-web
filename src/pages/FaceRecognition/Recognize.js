import React, { PureComponent } from 'react';
import UploadImage from '../../components/UploadImage';
import styles from './Recognize.less';
import { Progress, Button,Tag} from 'antd';
import {detect,getPageList,matching,getFaceSprite} from '../../services/recognize';

const DISTANCE=0.4;
export default class Recognize extends PureComponent {
    state = {
        fileCode: '',
        face_sprite_url:'',
        face_url:'',
        page_index:1,
        page_size:2,
        rows:[],
        is_more:true,
        next_rows:[],
        face_count:0,
        is_loading:false,
        progress_per:0,
        similarity:0,
        match_data:[]
    };

    handleChange=(fileList)=> {
        this.setState({
            fileCode: fileList.length > 0 ? fileList[0].code : '',
            match_data:[]
        });
    }

    initMatchigState=async ()=>{
        return new Promise(resolve=>{
            this.setState({
                page_index:1,
                rows:[],
                is_more:true,
                next_rows:[],
                is_loading:true,
            },()=>{
                resolve()
            })
        }) 
    }

    /**
     * 开始比对
     */
    matching=async ()=> {
        this.setState({is_loading:true,progress_per:1})
        //检测人脸
        const {code,data}=await detect({file_code:this.state.fileCode})
        if(code) {
            this.setState({is_loading:false,progress_per:0})
            return;
        }
        await this.initMatchigState();
        let flag=this.state.is_more;
        await this.getPageList();
        let face_recognize_count=0;
        let matchs=[]
        while(flag){
             const {rows,is_more,next_rows,face_count}=this.state;
             const cur_rows= rows.concat(next_rows)
             for(let i =0;i<cur_rows.length;i++){
                  if(i==0&&is_more){
                    rows.splice(0,rows.length)
                    this.getPageList(true);
                  }
                 let match=[]
                 for(let file of cur_rows[i].file_info){
                    face_recognize_count++;
                    this.setState({
                        progress_per:Math.floor((face_recognize_count/face_count)*100),
                    })
                    const {data}=await matching({face_code:file.code,face_id:cur_rows[i].id});
                    if(data.label){
                        this.setState({'similarity':Math.round((1-data.distance)*100),face_url:file.faceSrc,});
                        if(DISTANCE-data.distance>0){
                            data.url=file.src;
                            match.push(data);
                        }
                    }
                 }
                 if(match.length>0){
                     match.sort((a,b)=>{
                         return a-b;
                     })
                     matchs.push(match[0])
                 }
             }
             flag=is_more;
        }
        this.setState({
            is_loading:false,
            face_url:this.state.face_sprite_url,
            progress_per:0,
            similarity:0,
            match_data:matchs
        })
    }

    /**
     * 获取页面列表
     */
    getPageList=async (next)=>{
        const {page_index,page_size}=this.state;
        const {code,data}=await getPageList({page_index:page_index,page_size:page_size});
        if(!code){
            const {rows,is_more,page_index,face_count}=data;
            const state={
                face_count:face_count,
                is_more:is_more,
                page_index:page_index+1
            }
            if(!next){
                state.rows=rows;
            }else{
                state.next_rows=rows;
            }
            return new Promise(resolve=>{
                this.setState(state,()=>{
                    resolve();
                })
            })
           
        }

    }

    async componentWillMount(){
        const {data}=await getFaceSprite();
        this.setState({
            face_url:data.src+"?time="+Date.now(),
            face_sprite_url:data.src+"?time="+Date.now()
        })
    }

    render() {
        const { fileCode,face_url,is_loading,progress_per,similarity,match_data} = this.state;
        const matchs=match_data.map(match=>{
           return <Tag key={match.label} color="green">{match.label+' '+(1-match.distance)*100+'%'}</Tag>
        })
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
                            onChange={this.handleChange}
                        />
                        <div className={styles.match}>
                        {matchs}
                        </div>
                    </div>
                    <div className={styles.columnCenter}>
                        <div style={{ fontSize: '16px', marginBottom: '20px' }}>
                            VS
                        </div>
                        <Progress
                            type="circle"
                            strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                            }}
                            percent={similarity}
                        />
                        <div style={{ fontSize: '16px', marginTop: '20px' }}>
                            相似度
                        </div>
                    </div>
                    <div className={styles.columnLeft}>
                        <div className={styles.title}>人脸库</div>
                        {face_url!=''?<img className={styles.face} src={face_url} />:null}
                        {progress_per>0?<Progress size="small" className={styles.progress} percent={progress_per} status="active" showInfo={false} />:null}
                    </div>
                </div>
                
                <div className={styles.button}>
                    <Button
                        size='large'
                        type='primary'
                        disabled={fileCode&&!is_loading? false : true}
                        onClick={()=>this.matching()}>
                        开始比对
                    </Button>
                </div>
            </div>
        );
    }
}
