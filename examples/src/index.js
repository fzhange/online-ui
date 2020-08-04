import React from 'react';
import { render} from 'react-dom';
import {Button,PoiList} from  "../../src/index"
// import '@babel/polyfill';

class App extends React.Component{
    render(){
        return (
            <PoiList cityName="hangzhou" districtId="14" locale="en-US"/>
        )
    }
}

render(<App />, document.getElementById("root"));