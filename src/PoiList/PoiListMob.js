import * as React from 'react';
import "./PoiListMob.less"
import LinesEllipsis from 'react-lines-ellipsis'




export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { i18n } = this.props;

        const arr = [1,2,3,4,5,6];
        return (
            <div className="poi_list_mob_con">
                {
                    arr.map((item,idx)=>{
                        return(
                            <div style={idx==0 ? {marginLeft:'10px'} : {}} className="poi_list_mob_con_ele">
                                <img className="img_style" src='https://dimg04.c-ctrip.com/images/100w1900000187kcn7D3A_C_220_110.png?proc=source%2ftrip'></img>
                                <div className="layer">
                                    <div className="desc_con">
                                        <div className="title">
                                            <LinesEllipsis text={'Cant Miss Attractions'} maxLine="1" />
                                        </div>
                                        <div className="desc_detial">
                                            1,218 Views
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}


