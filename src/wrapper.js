import * as React from 'react';
export default function wrapper(App){
    return class Wrapper extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                i18n:{},
            }
        }
        componentDidMount(){
            const script = document.createElement("script");
            script.src = "https://english.ctrip.com/m/i18n/100015463/en-us.js";
            script.async = true;
            script.onload = ()=>{
                this.setState({
                    i18n:window.i18n_100015463,
                })
            }
            document.body.appendChild(script);
        }
        render(){
            const {i18n} = this.state;
            return (
                <App {...this.props} i18n={i18n}></App>
            )
        }
    }
}