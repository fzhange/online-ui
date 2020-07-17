import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./index.less"


export default class Button extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="button_wrap">
                <button className="fz_30" style={{color:this.props.color,}}>
                    {this.props.children || "defalut value"}
                </button>
            </div>

        )
    }
}

