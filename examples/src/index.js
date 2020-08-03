import React from 'react';
import { render} from 'react-dom';
import {Button,PoiList} from  "../../src/index"
// import '@babel/polyfill';

class App extends React.Component{
    render(){
        return (
            <PoiList  districtId={294} locale="ja-JP"/>
        )
    }
}

render(<App />, document.getElementById("root"));