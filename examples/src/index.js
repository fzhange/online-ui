import React from 'react';
import { render} from 'react-dom';
import {Button,PoiList} from  "../../src/index"
// import '@babel/polyfill';

class App extends React.Component{
    render(){
        return (
            <>
                {/* <h1 style={{height:"50vh"}}>hello</h1>
                <h1 style={{height:"50vh"}}>hello</h1>
                <h1 style={{height:"50vh"}}>hello</h1> */}
                <PoiList type={2} id={14} source="flight" />
            </>
           
        )
    }
}

render(<App />, document.getElementById("root"));