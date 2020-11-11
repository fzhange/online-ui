import React from 'react';
import { render} from 'react-dom';
import {Head} from  "../../src/index"

// import '@babel/polyfill';

class App extends React.Component{
    render(){
        return (
            <>
                <Head  />
            </>
           
        )
    }
}

render(<App />, document.getElementById("root"));