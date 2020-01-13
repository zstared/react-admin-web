import React, { PureComponent } from 'react';
import UploadImage from '../../components/UploadImage';
import styles from './Recognize.less';
import { Progress, Button,Tag,Select,Checkbox,Modal} from 'antd';
import {detect,getPageList,matching,getFaceSprite} from '../../services/recognize';

const  DISTANCE_LOW=0.4;
const  DISTANCE_MID=0.5;
const  DISTANCE_HIG=0.6

export default class Recognize extends PureComponent {
    state = {
        fileCode: '',
        face_sprite_imgs:[],
        type_id:0,
        face_url:'',
        page_index:1,
        page_size:20,
        rows:[],
        is_more:true,
        next_rows:[],
        face_count:0,
        is_loading:false,
        progress_per:0,
        similarity:0,
        matchs:[],
        detect_url:'',
        mark_checked:true,
        match_modal:false,
        match_data:{},
    };


    async componentWillMount(){
        const {data}=await getFaceSprite();
        this.setState({
            face_url:data.length>0?data[0].url+"?time="+Date.now():'',
            face_sprite_imgs:data,
            type_id:data.length>0?data[0].id:'',
        })
    }

    handleChange=(fileList)=> {
        this.setState({
            fileCode: fileList.length > 0 ? fileList[0].code : '',
            matchs:[],
            detect_url:fileList.length > 0 ? fileList[0].url : '',
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
        const time=Date.now();
        this.setState({is_loading:true,progress_per:1})
        //检测人脸
        const {code,data}=await detect({file_code:this.state.fileCode})
        if(code) {
            this.setState({is_loading:false,progress_per:0})
            return;
        }
        await this.initMatchigState();
        let flag=this.state.is_more;
        try{
         await this.getPageList();
        }catch(e){
            flag=false;
        }
        let face_recognize_count=0;
        let matchs=[];
        while(flag){
             try{
             const {rows,is_more,next_rows,count,mark_checked}=this.state;
             console.log(is_more)
             const cur_rows= rows.concat(next_rows)
             for(let i =0;i<cur_rows.length;i++){
                  if(i==0&&is_more){
                    this.state.rows.splice(0,rows.length)
                    try{
                        this.getPageList();
                       }catch(e){
                           flag=false;
                       }
                  }
                 face_recognize_count++;
                 for(let file of cur_rows[i].file_info){
                    this.setState({
                        progress_per:Math.floor((face_recognize_count/count)*100),
                    })
                    const {data,code}=await matching({face_code:file.code,face_id:cur_rows[i].id});
                    if(!code){
                        if(data.label){
                            this.setState({'similarity':Math.round((1-data.distance)*100),face_url:mark_checked?file.faceSrc:file.src,});
                            if(DISTANCE_HIG-data.distance>0){
                                data.url=file.src;
                                matchs.push(data);
                            }
                        }
                    }else{
                        this.setState({is_more:false})
                        break;
                    }
                 }
             }
             flag=is_more;
            }catch(e){
                this.setState({is_more:false})
            }
        }
        matchs.sort((a,b)=>{
            return a.distance-b.distance;
        })
        if(matchs.length>3) matchs.splice(3)
        this.setState({
            is_loading:false,
            progress_per:0,
            similarity:0,
            matchs:matchs
        })
        this.handleTypeChange(this.state.type_id)
        console.log('time:'+(Date.now()-time))
    }

    /**
     * 获取页面列表
     */
    getPageList=async (next)=>{
        const {page_index,page_size,type_id}=this.state;
        const {code,data}=await getPageList({page_index:page_index,page_size:page_size,type_id:type_id});
        return new Promise((resolve,reject)=>{ 
        if(!code){
                const {rows,is_more,page_index,count}=data;
                const state={
                    count:count,
                    is_more:is_more,
                    page_index:page_index+1
                }
                if(!next){
                    state.rows=rows;
                }else{
                    state.next_rows=rows;
                }
                this.setState(state,()=>{
                    resolve();
                })
            }else{
                reject();
            }
        })
    }

     handleTypeChange=async(value)=>{
        const cur_sprite= this.state.face_sprite_imgs.find(item=>item.id==value);
        this.setState({
            type_id:value,
            face_url:cur_sprite?cur_sprite.url:''
        })
     }

     handleMarkChange=(e)=>{
         this.setState({
            mark_checked:e.target.checked
         })
     }

     handleOpenMatch=(data)=>{
         this.setState({
            match_modal:true,
            match_data:data
         })
     }

     handleModalVisible=()=>{
         this.setState({
             match_modal:false
         })
     }



    /**
     * 渲染标签
     * @param {number} distance 
     */
    renderTag(distance){
        let per=(Math.round((1-distance)*100*100)/100)+'%'
        if(DISTANCE_LOW-distance>0){
            return <Tag color="green">{per}</Tag>
        }else if(DISTANCE_MID-distance>0){
            return <Tag color="orange">{per}</Tag>
        }else{
            return <Tag color="red">{per}</Tag>
        }
    }

    render() {
        const { fileCode,face_url,is_loading,progress_per,similarity,matchs,detect_url,face_sprite_imgs,type_id,mark_checked,match_data} = this.state;
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
                        <div className={styles.title}>
                            <Checkbox checked={mark_checked} onChange={this.handleMarkChange} >脸标</Checkbox>
                            <span>人脸库</span>
                            <Select disabled={!is_loading? false : true} onChange={this.handleTypeChange} value={type_id} className={styles.typeSelect} size="small">
                                   <Select.Option value='' >
                                     所有  
                                   </Select.Option>
                                {
                                    face_sprite_imgs.map((item,index)=>{
                                        return (
                                            <Select.Option key={index} value={item.id} >
                                                 {item.type_name}
                                            </Select.Option>
                                        )
                                    })

                                }
                            </Select>
                        </div>
                        <div className={styles.faceWrapper}>{face_url!=''?<img className={styles.face} src={face_url} />:null}</div>
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
                {matchs.length>0?
                <div>
                     <div className={styles.matchsTitle}>对比结果</div>
                     <div className={styles.matchs}>
                               {
                                matchs.map((match,index)=>{
                                    let per=(Math.round((1-match.distance)*100*100)/100)+'%'
                                    return (
                                        <div key={index} className={styles.match}>
                                            <img src={detect_url} />
                                            <div className={styles.result}>
                                              <div className={styles.resultInfo}>
                                              <span>{match.label}</span>
                                               {
                                                 this.renderTag(match.distance)
                                               }
                                               </div>
                                               <Button size="small" type="primary" onClick={()=>this.handleOpenMatch(match)} >查看</Button>
                                            </div>
                                            <img src={match.url} />
                                        </div>
                                    )
                                })
                          }
                     </div>
                </div>
                  :null
                }
                 <Modal
                    width="800px"
                    title={null}
                    visible={this.state.match_modal}
                    footer={null}
                    onCancel={this.handleModalVisible}
                    >
                        <div className={styles.matchModal}>
                            <img src={detect_url} />
                            <div className={styles.result}>
                                <div className={styles.resultInfo}>
                                <span>{match_data.label}</span>
                                {
                                    this.renderTag(match_data.distance)
                                }
                                </div>
                            </div>
                            <img src={match_data.url} />
                        </div>
                </Modal>
            </div>
            
        );
    }
}
