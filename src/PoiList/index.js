import * as React from 'react';
import wrapper from "../wrapper";
import PoiListOnline from "./PoiListOnline";
import PoiListMob from "./PoiListMob";


export default @wrapper
class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { i18n,userAgent={} } = this.props;
        return (
            <>
                {   
                    userAgent.isMobile ?
                    (<PoiListMob userAgent={userAgent} i18n={i18n}></PoiListMob>) :
                    (<PoiListOnline i18n={i18n}></PoiListOnline>)
                }
            </>
        )
    }
}


