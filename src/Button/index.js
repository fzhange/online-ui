import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./index.less"
import axios from "axios";
import wrapper from "../wrapper";
import { say, invoke_post } from "../tool/index";



export default @wrapper
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.imgRef = React.createRef();
    }
    componentDidMount() {
        fetch("https://avatars0.githubusercontent.com/u/62326668?s=40&v=4").then((response) => response.arrayBuffer())
            .then((buffer) => {
                const blob = new Blob([buffer]);
                const objectURL = URL.createObjectURL(blob);
                this.imgRef.current.src = objectURL;
            }).catch((error) => {
                console.error('error: ', error);
            });
    }
    onClickHandle() {
        say('button');
    }
    render() {
        const { i18n } = this.props;
        return (
            <>
                <button onClick={this.onClickHandle.bind(this)} className="fz_30" style={{ color: this.props.color, }}>
                    {this.props.children || "defalut value"}
                </button>
                <img ref={this.imgRef} src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1433231170,532781770&fm=26&gp=0.jpg"></img>
                <div>i18n val {i18n['Key.poilist_subtype']}</div>
            </>
        )
    }
}


