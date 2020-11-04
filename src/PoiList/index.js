import * as React from 'react';
import "./PoiListOnline.less"
import LinesEllipsis from 'react-lines-ellipsis'

import { invoke_post, thousandBitSeparator, replaceAll, handlePicUrl } from "../tool/index";
import PropTypes from 'prop-types';


import { Button } from 'antd';
// import "antd/lib/button/style"



// window['__bfi'].push(['_tracklog', '102358', `more_module_name=${name}&more_module_index=${index}${id ? '&more_module_id=' + id : ''}`])
export default class PoiListOnline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rankList: [],
            moreUrl: '',
            moreText:'',
            moduleName:"",
        }
    }
    // async componentDidMount() {
    //     try {
    //         let { locale, ENV, currency, id, type, source } = this.props;
    //         console.log('locale,ENV,currency,id,type,source: ', locale, ENV, currency, id, type, source);
    //         let resultData = await invoke_post({
    //             serviceCode: "19836",
    //             serviceName: "getRecommendRankList",
    //             locale,
    //             currency,
    //             ENV,
    //             params: {
    //                 id, type, source
    //             }
    //         });
    //         console.log('resultData: ', resultData);
    //         let {rankList=[],moreUrl='',moreText='',moduleName=''} = resultData;
    //         this.setState({
    //             rankList, moreUrl,moreText,moduleName
    //         },()=>{
    //             this.props.subscribleSubComponentUpdate(); //必须写这行代码 通知父组件子组件渲染完成 曝光逻辑处理
    //         })
    //     } catch (error) {
    //         console.log('error in componentDidMount : ', error);
    //     }
    // }

    render() {
        let { rankList,moreText,moduleName } = this.state;

        let { i18n={} } = this.props;
        let { locale, ENV, currency, id, type, source,pagecode } = this.props;
        return (
            <div className="page_container">
                <Button type="primary">Primary Button</Button>
            </div>
        )
    }
}




PoiListOnline.defaultProps = {
    locale: "en-US",
    ENV: "PROD",
    currency: "USD",
};
PoiListOnline.propTypes = {
    locale: PropTypes.string,
    ENV: PropTypes.string,
    currency: PropTypes.string,

    id: PropTypes.number.isRequired,  // id
    type: PropTypes.number.isRequired, //1=districtId 2=机票cityId
    source: PropTypes.string.isRequired, //来源
}