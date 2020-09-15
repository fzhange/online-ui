import * as React from 'react';
import { func } from 'prop-types';

/**
 * 防抖处理函数，避免连续滚动触发的性能问题
 */
const debounce = (originFun,...wrapArgs)=>{
    let timeId= null;
    return (...innerArgs)=>{
        if(!!timeId) clearTimeout(timeId);
        timeId = setTimeout(()=>{
            originFun.call(null,...innerArgs,...wrapArgs);
        },300)
    }
}

export default function wrapper(App){
    return class Wrapper extends React.Component{
        constructor(props){
            super(props);
            this.exposureTraceElements = [];
            this.exposureTraced = [];
            this.state = {
                i18n:{},
                pagecode:null,
            }
        }
        getPageCode(){ //获取pagecode 埋点需要
            let pagecode = null;
            pagecode = document.querySelector('#page_id') && document.querySelector('#page_id').value;
        }
        tracelog(value = 'null', traceid = '') {
            try{
                let {pagecode} = this.state;
                if(!window['__bfi']) window['__bfi'] = [];
                console.table({pagecode:pagecode,traceid:traceid, value:value});
                pagecode && window['__bfi'].push(['_tracklog', traceid, value]);
            }catch(error){
                console.error('@ctrip/gs_online_ui_tracelog',error);
            }
        }
        //首屏曝光
        judgeExposureWhenNoScroll = () => {
            const windowH = window.innerHeight
            Array.from(this.exposureTraceElements).forEach(trace => {
              if (trace.offsetTop - windowH < 0) {
                if (this.exposureTraced.indexOf(trace) == -1) {
                  this.tracelog(trace.getAttribute('data-exposure-content'), trace.getAttribute('data-exposure-traceid'))
                  this.exposureTraced.push(trace)
                }
              }
            })
        }
        // 滚动曝光埋点
        initExposureTrace(){
            const windowH = window.innerHeight
            this.exposureTraceElements = document.getElementsByClassName('burited_point')
            this.judgeExposureWhenNoScroll();
            window.addEventListener('scroll',debounce((e)=>{
                Array.from(this.exposureTraceElements).forEach(trace => {
                  if (trace.offsetTop - windowH < window.scrollY) {
                    if (this.exposureTraced.indexOf(trace) == -1) { //如果从未曝光过，记一次曝光。二次曝光不算。
                      this.tracelog(trace.getAttribute('data-exposure-content'), trace.getAttribute('data-exposure-traceid'))
                      this.exposureTraced.push(trace)
                    }
                  }
                })
            }))
        }
        insertI18n(){
            const {locale='en-us'} = this.props;
            const script = document.createElement("script");
            script.src = `https://www.trip.com/m/i18n/100015463/${locale}.js`;
            script.async = true;
            let that = this;
            script.onload = script.onreadystatechange = function(){
                console.log('onloading',this.readyState);
                //IE的script 元素只支持onreadystatechange事件，不支持onload事件。 
                //FF的script 元素不支持onreadystatechange事件，只支持onload事件。
                if(!this.readyState || this.readyState=='loaded' || this.readyState=='complete'){
                    that.setState({
                        i18n:window.i18n_100015463,
                    })
                }  
            }
            script.onerror = function(error){
                if(!this.readyState || (this.readyState!='loaded' && this.readyState!='complete')){
                    console.error('shark jssdk loaded error',error);
                }
            }
            // script.onload = ()=>{
            //     this.setState({
            //         i18n:window.i18n_100015463,
            //     })
            // }

            // script.onerror = (error)=>{
            //     console.error('shark jssdk loaded error',error);
            // }
            document.body.appendChild(script);
        }
        componentDidMount(){
            this.insertI18n();
            this.getPageCode();
        }
        subscribleSubComponentUpdate(){
            this.initExposureTrace()
        }
        render(){
            const {i18n={},pagecode} = this.state;
            return (
                <App {...this.props} 
                    subscribleSubComponentUpdate={this.subscribleSubComponentUpdate.bind(this)} 
                    tracelog={this.tracelog.bind(this)}
                    i18n={i18n}
                    pagecode={pagecode}
                    >
                </App>
            )
        }
    }
}