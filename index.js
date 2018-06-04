import React from 'react';
import styles from './index.css';

class Progress extends React.PureComponent{

  constructor(props){
    super(props);
    //status: 1:绿色   2:黄色  3:灰色
    // this.progressArray=[
    //   {name:'步骤一',status:1,remark:'步骤一',click:null},
    //   {name:'步骤二',status:1,remark:'步骤二',click:null},
    //   {name:'步骤三',status:2,remark:'步骤三',click:null},
    //   {name:'步骤四',status:3,remark:'步骤四',click:null},
    //   {name:'步骤五',status:3,remark:'步骤五',click:null},
    //   {name:'步骤六',status:3,remark:'步骤六',click:null}
    //   ];
    this.progressArray=this.props.data ? this.props.data:[];
    this.fontSize=this.props.fontSize?this.props.fontSize:12;
  }


  loadProcess=()=>{
    let progress=[];
    this.progressArray.map((item,index)=>{
      if(index==0){
        return;
      }
      if(item.status==1){
        progress.push(
          <span className={styles.lineSpan}  style={{width:1/(this.progressArray.length-1)*100+"%"}}>
            <span className={styles.lineOk +"  " + styles['widthGrow'+index]} />
          </span>)
      }else if(item.status==2){
        progress.push(
          <span className={styles.lineSpan} style={{width:1/(this.progressArray.length-1)*100+"%"}}>
            <span className={styles.lineOn +"  " + styles['widthGrow'+index]}/>
          </span>)
      }else if(item.status==3){
        progress.push(
          <span className={styles.lineSpan} style={{width:1/(this.progressArray.length-1)*100+"%"}}>
            <span className={styles.lineWait +"  " + styles['widthGrow'+index]}/>
          </span>)
      }
    });

    return progress;
  };

  loadName=()=>{
    let progress=[];
    this.progressArray.map((item,index)=>{
      if(index!=this.progressArray.length-1){
        progress.push(
          <span className={styles.lineSpan} style={{width:1/(this.progressArray.length-1)*100+"%"}}>
          <span style={{marginLeft:(0-item.name.length/2*this.fontSize)+"px" ,fontSize:this.fontSize+"px" }} className={styles.progressName}>{item.name}</span>
        </span>)
      }else{
        progress.push(
          <span style={{position:'absolute',right:(0-item.name.length/2*this.fontSize)+"px" ,fontSize:this.fontSize+"px" }} className={styles.progressName}>{item.name}</span>
        )
      }
    });
    return progress;
  };

  loadRemark=()=>{
    let progress=[];
    this.progressArray.map((item,index)=>{

      if(index!=0 && index !=this.progressArray.length-1){
        if(item.status !=this.progressArray[index+1].status){
          progress.push(
            <div style={{display:'inline-block',textAlign:'right',width:1/(this.progressArray.length-1)*100+"%"}}>
              <div className={styles.remarkOutOut +" " + styles['remarkGrow'+index] } style={{marginRight:(0-(item.name.length*this.fontSize+16)/2)+"px"}}>

                <div style={{fontSize:this.fontSize+"px"}} className={item.status==1?styles.remarkOk : item.status==2? styles.remarkOn :styles.remarkWait} onClick={item.click}>{item.remark}</div>

                <div style={{height:'10px'}}>
                  <span className={styles.triangleDown} style={{borderTopColor:item.status==1?'#7DC855' : item.status==2? '#FBBC37':'#E1E8EE'}}/>
                </div>
              </div>
            </div>
          )
        }else{
          progress.push(
          <div style={{display:'inline-block',textAlign:'right',width:1/(this.progressArray.length-1)*100+"%"}} />
          )
        }
      }
    });
    return progress;
  };

  render(){

    return <div style={{padding:'8px 30px'}}>

      <div style={{position:'relative'}}>
        {this.loadRemark()}
      </div>

      <div className={styles.lineNo}>
        {this.loadProcess()}
      </div>
      <div style={{position:'relative',marginTop:'4px'}}>
        {this.loadName()}
      </div>
    </div>
  }
}

export default Progress;
