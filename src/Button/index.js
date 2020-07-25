import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./index.less"
import axios from "axios";
import wrapper  from "../wrapper";



export default @wrapper 
class Button extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {i18n} = this.props;
        return(
            <>
                <button className="fz_30" style={{color:this.props.color,}}>
                    {this.props.children || "defalut value"}
                </button>
                <div>i18n val {i18n['Key.poilist_subtype']}</div>
            </>
        )
    }
}


