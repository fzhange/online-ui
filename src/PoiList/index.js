import * as React from 'react';
import "./PoiListOnline.less"
import LinesEllipsis from 'react-lines-ellipsis'
import wrapper from "../wrapper";
import { invoke_post, thousandBitSeparator, replaceAll, handlePicUrl } from "../tool/index";
import PropTypes from 'prop-types';


// window['__bfi'].push(['_tracklog', '102358', `more_module_name=${name}&more_module_index=${index}${id ? '&more_module_id=' + id : ''}`])
export default @wrapper
class PoiListOnline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rankList: [],
            moreUrl: '',
            moreText:'',
            moduleName:"",
        }
    }
    async componentDidMount() {
        try {
            let { locale, ENV, currency, id, type, source } = this.props;
            console.log('locale,ENV,currency,id,type,source: ', locale, ENV, currency, id, type, source);
            let resultData = await invoke_post({
                serviceCode: "19836",
                serviceName: "getRecommendRankList",
                locale,
                currency,
                ENV,
                params: {
                    id, type, source
                }
            });
            console.log('resultData: ', resultData);
            let {rankList=[],moreUrl='',moreText='',moduleName=''} = resultData;
            this.setState({
                rankList, moreUrl,moreText,moduleName
            },()=>{
                this.props.subscribleSubComponentUpdate(); //必须写这行代码 通知父组件子组件渲染完成 曝光逻辑处理
            })
        } catch (error) {
            console.log('error in componentDidMount : ', error);
        }
    }
    moreClick() {
        const { moreUrl } = this.state;
        if (!!moreUrl) location.href =  `${location.origin}${moreUrl}`;
    }
    itemClick(item) {
        const { jumpUrl } = item;
        let { locale, ENV, currency, id, type, source,pagecode } = this.props;
        this?.props?.tracelog(`distridId=${id}&actioncode=tgs_poidetail_expo_listmoudle&sourceType=${source}&pageid=${pagecode}`,158877);
        if (!!jumpUrl) window.open(`${location.origin}${jumpUrl}`);
    }
    render() {
        let { rankList,moreText,moduleName } = this.state;

        let { i18n={} } = this.props;
        if (!rankList.length || rankList.length <= 2) return null;
        let { locale, ENV, currency, id, type, source,pagecode } = this.props;
        return (
            <div className="page_container burited_point"  
                data-exposure-content={`distridId=${id}&actioncode=tgs_poidetail_expo_listmoudle&sourceType=${source}&pageid=${pagecode}`}
                data-exposure-traceid="158876">
                <h1 className="title_desc">
                    {moduleName}
                </h1>
                <div className="page_container_sub">
                    {
                        rankList.map((item, idx) => {
                            let haveImageUrl = !!item.imageUrl;
                            let coverImageUrl = haveImageUrl ? handlePicUrl(item.imageUrl, 350, 230) : handlePicUrl('https://dimg04.c-ctrip.com/images/0101t1200081z15yqC330.png', 350, 230)
                            if (idx >= 3) return null;
                            return (
                                <div onClick={this.itemClick.bind(this, item)} className={idx == 2 ? 'img_con img_con_834' : `img_con`} key={idx} style={idx == 0 ? { margin: 0 } : {}}>
                                    <img className="img_style" style={!haveImageUrl?{height:'100%'}:{}} src={coverImageUrl}></img>
                                    <div className="layer">
                                        <div className="desc_con">
                                            <div className="title">
                                                <LinesEllipsis text={item.name} maxLine="2" />
                                            </div>
                                            <div className="desc_detial_con">
                                                {item.poiNum && <div className="l">{item.poiNum}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="img_con">
                        <img className="img_style" src={handlePicUrl("https://dimg04.c-ctrip.com/images/0100x1200082gvlqfB9BF.png", 350, 230)} />
                        <div className="layer" style={{ background: 'rgba(15,41,77,0.50)' }}>
                            {
                                !!moreText && (
                                    <div className="desc_more" onClick={this.moreClick.bind(this)}>
                                        {moreText}
                                    </div>
                                )
                            } 
                        </div>
                    </div>
                </div>
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