


import React, {Component} from 'react';
import { HashRouter } from "react-router-dom";
import Main from "./src/Main";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component{
    render(){
        return(
            <HashRouter>
            <Main/>
            </HashRouter>
        )
    }
}



export default App;