import React from 'react';
import { render} from 'react-dom';
import {Button} from  "../../src/index"
// import '@babel/polyfill';

class App extends React.Component{
    render(){
        return (
            <Button color="red"/>
        )
    }
}

render(<App />, document.getElementById("root"));