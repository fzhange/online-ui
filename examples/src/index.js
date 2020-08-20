import React from 'react';
import { render} from 'react-dom';
import {Button,PoiList} from  "../../src/index"
// import '@babel/polyfill';

class App extends React.Component{
    render(){
        return (
            <PoiList type={2} id={14} source="flight" ENV="UAT"/>
        )
    }
}

render(<App />, document.getElementById("root"));