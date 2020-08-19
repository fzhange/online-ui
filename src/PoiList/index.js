import * as React from 'react';
import "./PoiListOnline.less"
import LinesEllipsis from 'react-lines-ellipsis'
import wrapper from "../wrapper";
import { invoke_post, thousandBitSeparator, replaceAll, handlePicUrl } from "../tool/index";
import PropTypes from 'prop-types';



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
                serviceCode: "19982",
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
            })
        } catch (error) {
            console.log('error in componentDidMount : ', error);
        }
    }
    moreClick() {
        const { moreUrl } = this.state;
        if (!!moreUrl) location.href = moreUrl;
    }
    itemClick(item) {
        const { jumpUrl } = item;
        if (!!jumpUrl) location.href = jumpUrl;
    }
    render() {
        let { rankList } = this.state;
        let { i18n } = this.props;

        if (!rankList.length || rankList.length < 4) return null;

        return (
            <div className="page_container">
                <h1 className="title_desc">
                    {replaceAll(i18n['key.destination.topicslist'])}
                </h1>
                <div className="page_container_sub">
                    {
                        rankList.map((item, idx) => {
                            let coverImageUrl = handlePicUrl(item.imageUrl, 350, 230)
                            if (idx >= 3) return null;
                            let totalContent = i18n['key.attractions_number'];
                            return (
                                <div onClick={this.itemClick.bind(this, item)} className={idx == 2 ? 'img_con img_con_834' : `img_con`} key={idx} style={idx == 0 ? { margin: 0 } : {}}>
                                    <img className="img_style" src={coverImageUrl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAACcBAMAAABW9qnFAAAAG1BMVEXr6/LY2N3k5Orp6e/g4Obn5+3b2+Dd3ePi4udFuIuhAAACxklEQVR42u2WwVPTQBSHn4RAj2yhSY9thZ5TFL02EIVjWga9EhHHYyMOvbbqOP7Z5r1dssn0wKHp2nF+3yHZffua/fp22ywBAAAAAAAAAAAAAAAAAAAAAAAAYDP4j58jco/3qkIZ7SvVIfe8UBVuyZApFZJz6jKHpPG5Q8/jTiYi16zKCEU7IPfUZbZpA5cyfh7+s592UYgjvke0BbCM7Z29pAr+4GTlC0wHaZk8uK6NSDJf15bZTZJz77dq03GSLMhPkqvoY7F6YUpVdvIi9k5P/r5o6j/r10ly4Wfc83P+yNoye8Wji3abYr7sFL1LxYRR1SWT2AO3Y2nKZydFWs69TxLsNiDDWJmSe7LEJtYjemuadyJTZ9y0jMVWfV+VMl5mmkG0KtPenMwdPbE0ka6kG25XZYKNyciw4CvDTLzssJGxpE3IhCfXVZkf07z66H2JncZBRB43v94M+RaJzNFNLFt4yuu3aEAm4GmtzAPx3e7HiY7590QtU7FYZp7ItaUXaCSfWF+mQzWZSIbtUWdpYpHOnnGxZHgiFqS3bqshmXFNpq2Xxr62cokJI+Pl8TDLhHq8w8VsRiatyYjDrhRMkxUxKxM8xToVmcPmZKKazAH3TIkEiQlmepPtQkaq0DIytjJ1mdxRZdory1TfM8SwtAuZUM9q1yY2MZO9MIU7cCAjs3m5+Q2f8doYg2+2YBwaO5EJIxqad3Sfk/Z07INK9ZvhpxRGpU5kVJDJVa/GTAeDRzlV5Nz+IsrkRMYeCEb6Zo8NHDF0nMosOEmy3thjg03oOZSR0aW++5k9Q/Rt3VzImJl7MhsHy7Nml0qxIHUjcxErvlL5ci4YSq0kr5Wxy4Kek1kfeaJ3PP/eI8bLedMyp5fzc9L4v+ZXKW2c1a/n/1lz2vVltgTIQAYy/6UMAAAAAAAAAAAAAAAAAAAAAAAA4Ii/7RWuOpCJtjcAAAAASUVORK5CYII='}></img>
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
                        <img className="img_style" style={{ height: '100%' }}
                            src={handlePicUrl("https://dimg02.c-ctrip.com/images/01055120007lbex10B7D7.png", 350, 230)} />
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