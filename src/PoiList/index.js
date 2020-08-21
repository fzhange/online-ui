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
            let rankList = resultData?.rankList || [];
            let moreUrl = resultData?.moreUrl || '';
            this.setState({
                rankList, moreUrl
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
        if (!!jumpUrl) location.href = `${location.origin}${jumpUrl}`; ;
    }
    render() {
        let { rankList } = this.state;
        let { i18n } = this.props;
        if (!rankList.length || rankList.length <= 2) return null;

        return (
            <div className="page_container burited_point" 
                data-exposure-content={`districtId=2&districtType=2&actioncode=tgs_dstdetail_expo_listtopic_card`}
                data-exposure-traceid="138901">
                <h1 className="title_desc">
                    {replaceAll(i18n['key.destination.topicslist'])}
                </h1>
                <div className="page_container_sub">
                    {
                        rankList.map((item, idx) => {
                            let haveImageUrl = !!item.imageUrl;
                            let coverImageUrl = haveImageUrl ? handlePicUrl(item.imageUrl, 350, 230) : handlePicUrl('https://dimg04.c-ctrip.com/images/0101t1200081z15yqC330.png', 350, 230)
                            if (idx >= 3) return null;
                            let totalContent = i18n['key.attractions_number'];
                            return (
                                <div onClick={this.itemClick.bind(this, item)} className={idx == 2 ? 'img_con img_con_834' : `img_con`} key={idx} style={idx == 0 ? { margin: 0 } : {}}>
                                    <img className="img_style" style={!haveImageUrl?{height:'100%'}:{}} src={coverImageUrl}></img>
                                    <div className="layer">
                                        <div className="desc_con">
                                            <div className="title">
                                                <LinesEllipsis text={item.name} maxLine="2" />
                                            </div>
                                            <div className="desc_detial_con">
                                                {item.poiNum && <div className="l">{replaceAll(totalContent, thousandBitSeparator(item.poiNum || 0))}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="img_con">
                        <img className="img_style" src={handlePicUrl("https://dimg02.c-ctrip.com/images/01055120007lbex10B7D7.png", 350, 230)} />
                        <div className="layer" style={{ background: 'rgba(15,41,77,0.50)' }}>
                            <div className="desc_more" onClick={this.moreClick.bind(this)}>
                                {i18n['key.more']}
                            </div>
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