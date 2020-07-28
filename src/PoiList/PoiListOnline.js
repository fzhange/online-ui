import * as React from 'react';
import "./PoiListOnline.less"
import LinesEllipsis from 'react-lines-ellipsis'


export default  class PoiListOnline extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // let rankList = [
        //     {
        //         rankId: 5000087,
        //         name: "Can't Miss rankList",
        //         poiNum: 36,
        //         viewNum: 1218,
        //         imageUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1257412688,921483897&fm=26&gp=0.jpg',
        //         jumpUrl: 'https://www.baidu.com/?tn=02003390_43_hao_pg',
        //     },
        // ]
        return (
            <div className="page_container">
                <div className="page_container_sub">
                {
                    [1,2,3,4].map(()=>{
                        return (
                            <div className="img_con">
                                <img className="img_style" src='https://dimg04.c-ctrip.com/images/100w1900000187kcn7D3A_C_220_110.png?proc=source%2ftrip'></img>
                                <div className="layer">
                                    <div className="desc_con">
                                        <div className="title">
                                            <LinesEllipsis text={'Cant Miss Attractions'} maxLine="2" />
                                        </div>
                                        <div className="desc_detial_con">
                                            <div className="desc_detial_con_left">
                                                45 Attractions
                                            </div>
                                            <div className="desc_detial_con_right">
                                                1,218 Views
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hover_theme">
                                    <div className="hover_theme_desc">
                                        Cant Miss Attractions
                                    </div>
                                </div>
                             
                            </div>
                        )
                    })
                }
                </div>
                <div className="more_con">
                    更多
                </div>
            </div>
        )
    }
}