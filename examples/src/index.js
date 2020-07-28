import React from 'react';
import { render} from 'react-dom';
import {Button,PoiList} from  "../../src/index"
// import '@babel/polyfill';

class App extends React.Component{
    render(){
        return (
            <PoiList color="red"/>
        )
    }
}

render(<App />, document.getElementById("root"));