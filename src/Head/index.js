import * as React from 'react';
import "./index.less"

export default class PoiListOnline extends React.Component {
    constructor(props) {
        super(props);

    }
    doClick(){
        location.href = "https://www.baidu.com/?tn=02003390_43_hao_pg"
    }

    render() {
        return (
            <div className="page_container">
                {
                    [1,2,3,4,5].map((item,idx)=>{
                        return  <div onClick={this.doClick.bind(this)} className="btn">button</div>
                    })
                }
            </div>
        )
    }
}




