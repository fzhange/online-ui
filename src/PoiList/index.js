import * as React from 'react';
import "./PoiListOnline.less"
import LinesEllipsis from 'react-lines-ellipsis'
import wrapper from "../wrapper";
import { invoke_post, thousandBitSeparator, replaceAll } from "../tool/index";


export default @wrapper
class PoiListOnline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendRankModule: null,
        }
    }
    async componentDidMount() {
        try {
            let { i18n, locale = "en-US", currency = "USD", ENV = "PROD" ,districtId} = this.props;
            // ENV = "UAT"
            // locale = "ja-JP";
            // districtId = 294

            let recommendRankModule = await invoke_post({
                serviceCode: "19836",
                serviceName: "getDestinationPageInfo",
                locale,
                currency,
                ENV,
                params: {
                    districtId,
                }
            }).then((data) => {
                let recommendRankModule = null;
                const moduleList = data?.moduleList || [];
                let item_13 = moduleList.filter((item) => {
                    return item.type == 13;
                }).shift();
                let _recommendRankModule = item_13?.recommendRankModule || {};
                let rankList = _recommendRankModule?.rankList || []
                if (rankList.length && rankList.length >= 3) {
                    recommendRankModule = _recommendRankModule;
                }
                return recommendRankModule;
            });
            this.setState({
                recommendRankModule
            })
        } catch (error) {
            console.log('error in componentDidMount : ', error);
        }
    }
    moreClick() {
        let { recommendRankModule } = this.state;
        if (recommendRankModule?.moreUrl) location.href = recommendRankModule?.moreUrl;
    }
    render() {
        let { recommendRankModule } = this.state;
        let rankList = recommendRankModule?.rankList || [];
        const { i18n } = this.props;
        // rankList = [
        // {
        //     rankId: 5000087,
        //     name: "Can't Miss rankList",
        //     poiNum: 36,
        //     viewNum: 1218,
        //     imageUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1257412688,921483897&fm=26&gp=0.jpg',
        //     jumpUrl: 'https://www.baidu.com/?tn=02003390_43_hao_pg',
        // }]
        if (!rankList.length) return null;
        return (
            <div className="page_container">
                <h1 className="title_desc">
                    {replaceAll(i18n['key.destination.topicslist'], 'Shanghai')}
                </h1>
                <div className="page_container_sub">
                    {
                        rankList.map((item, idx) => {
                            if(idx >= 3) return null;
                            let totalContent = i18n['key.attractions_number'] || 'key.attractions_number'
                            return (
                                <div className={idx == 2 ? 'img_con img_con_834' : `img_con`} key={idx} style={idx == 0 ? { margin: 0 } : {}}>
                                    <img className="img_style" src={item.imageUrl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAACcBAMAAABW9qnFAAAAG1BMVEXr6/LY2N3k5Orp6e/g4Obn5+3b2+Dd3ePi4udFuIuhAAACxklEQVR42u2WwVPTQBSHn4RAj2yhSY9thZ5TFL02EIVjWga9EhHHYyMOvbbqOP7Z5r1dssn0wKHp2nF+3yHZffua/fp22ywBAAAAAAAAAAAAAAAAAAAAAAAAYDP4j58jco/3qkIZ7SvVIfe8UBVuyZApFZJz6jKHpPG5Q8/jTiYi16zKCEU7IPfUZbZpA5cyfh7+s592UYgjvke0BbCM7Z29pAr+4GTlC0wHaZk8uK6NSDJf15bZTZJz77dq03GSLMhPkqvoY7F6YUpVdvIi9k5P/r5o6j/r10ly4Wfc83P+yNoye8Wji3abYr7sFL1LxYRR1SWT2AO3Y2nKZydFWs69TxLsNiDDWJmSe7LEJtYjemuadyJTZ9y0jMVWfV+VMl5mmkG0KtPenMwdPbE0ka6kG25XZYKNyciw4CvDTLzssJGxpE3IhCfXVZkf07z66H2JncZBRB43v94M+RaJzNFNLFt4yuu3aEAm4GmtzAPx3e7HiY7590QtU7FYZp7ItaUXaCSfWF+mQzWZSIbtUWdpYpHOnnGxZHgiFqS3bqshmXFNpq2Xxr62cokJI+Pl8TDLhHq8w8VsRiatyYjDrhRMkxUxKxM8xToVmcPmZKKazAH3TIkEiQlmepPtQkaq0DIytjJ1mdxRZdory1TfM8SwtAuZUM9q1yY2MZO9MIU7cCAjs3m5+Q2f8doYg2+2YBwaO5EJIxqad3Sfk/Z07INK9ZvhpxRGpU5kVJDJVa/GTAeDRzlV5Nz+IsrkRMYeCEb6Zo8NHDF0nMosOEmy3thjg03oOZSR0aW++5k9Q/Rt3VzImJl7MhsHy7Nml0qxIHUjcxErvlL5ci4YSq0kr5Wxy4Kek1kfeaJ3PP/eI8bLedMyp5fzc9L4v+ZXKW2c1a/n/1lz2vVltgTIQAYy/6UMAAAAAAAAAAAAAAAAAAAAAAAA4Ii/7RWuOpCJtjcAAAAASUVORK5CYII='}></img>
                                    <div className="layer">
                                        <div className="desc_con">
                                            <div className="title">
                                                <LinesEllipsis text={item.name} maxLine="2" />
                                            </div>
                                            <div className="desc_detial_con">
                                                {item.poiNum && replaceAll(totalContent, thousandBitSeparator(item.poiNum || 0))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="img_con">
                        <img className="img_style" style={{height: '100%'}}
                         src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAACcBAMAAABW9qnFAAAAG1BMVEXr6/LY2N3k5Orp6e/g4Obn5+3b2+Dd3ePi4udFuIuhAAACxklEQVR42u2WwVPTQBSHn4RAj2yhSY9thZ5TFL02EIVjWga9EhHHYyMOvbbqOP7Z5r1dssn0wKHp2nF+3yHZffua/fp22ywBAAAAAAAAAAAAAAAAAAAAAAAAYDP4j58jco/3qkIZ7SvVIfe8UBVuyZApFZJz6jKHpPG5Q8/jTiYi16zKCEU7IPfUZbZpA5cyfh7+s592UYgjvke0BbCM7Z29pAr+4GTlC0wHaZk8uK6NSDJf15bZTZJz77dq03GSLMhPkqvoY7F6YUpVdvIi9k5P/r5o6j/r10ly4Wfc83P+yNoye8Wji3abYr7sFL1LxYRR1SWT2AO3Y2nKZydFWs69TxLsNiDDWJmSe7LEJtYjemuadyJTZ9y0jMVWfV+VMl5mmkG0KtPenMwdPbE0ka6kG25XZYKNyciw4CvDTLzssJGxpE3IhCfXVZkf07z66H2JncZBRB43v94M+RaJzNFNLFt4yuu3aEAm4GmtzAPx3e7HiY7590QtU7FYZp7ItaUXaCSfWF+mQzWZSIbtUWdpYpHOnnGxZHgiFqS3bqshmXFNpq2Xxr62cokJI+Pl8TDLhHq8w8VsRiatyYjDrhRMkxUxKxM8xToVmcPmZKKazAH3TIkEiQlmepPtQkaq0DIytjJ1mdxRZdory1TfM8SwtAuZUM9q1yY2MZO9MIU7cCAjs3m5+Q2f8doYg2+2YBwaO5EJIxqad3Sfk/Z07INK9ZvhpxRGpU5kVJDJVa/GTAeDRzlV5Nz+IsrkRMYeCEb6Zo8NHDF0nMosOEmy3thjg03oOZSR0aW++5k9Q/Rt3VzImJl7MhsHy7Nml0qxIHUjcxErvlL5ci4YSq0kr5Wxy4Kek1kfeaJ3PP/eI8bLedMyp5fzc9L4v+ZXKW2c1a/n/1lz2vVltgTIQAYy/6UMAAAAAAAAAAAAAAAAAAAAAAAA4Ii/7RWuOpCJtjcAAAAASUVORK5CYII='}></img>
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


