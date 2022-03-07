

import React, {Component} from 'react';
import auth from "./../../session/Auth"

import {NavLink} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LOGO from "./logo.png"
import CNAG_LOGO from "./cnag.png"


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { keycloak: auth.user.keycloak, authenticated: auth.user.authenticated};
    }

    logout(){
        auth.user.keycloak.logout()
            .then((apiResponse) => {})
            .catch(e=>{})
    }

    render(){
        let adminBar = null;

        if (auth.user.authenticated){
            adminBar = <li style={{float:"right"}}> <a  href="#" className="arrow" style={{color:"#c9fe05"}}  onClick={this.logout.bind(this)}>  <i className="fa fa-sign-out"/> Logout </a></li>
        }

        return (

            <AppBar
                style={{ background: '#0e6a62', color: "white" }}
                position="static" >
                <Toolbar>
                    <img src={LOGO}/>
                    {adminBar}
                    <div style={{marginLeft: "3%", width: "100%"}}>
                    <NavLink
                        activeStyle={{ color: 'orange' }}
                        exact to="/"
                             style={{
                                 color: "white",
                                 marginRight: "1%",
                                 textTransform: "uppercase",
                                 fontFamily: "Roboto"}}> <i className="fa fa-home" aria-hidden="true"/> Type & Search </NavLink>
                    <NavLink
                        activeStyle={{ color: 'orange' }}
                        to='/browser' style={{
                        color: "white",
                        marginRight: "1%",
                        textTransform: "uppercase",
                        fontFamily: "Roboto"}}> <i className="fa fa-list" aria-hidden="true"/>IGV-BROWSER</NavLink>
                    {this.props.children}
                       {/* */}
                    </div>
                    <div><img
                        id={"cnag_logo"}
                        src={CNAG_LOGO}/></div>
                </Toolbar>
            </AppBar>

           /* <div className="menuBar">
                <div className="myUL">

                </div>

            </div>*/
        )
    }
}

export default Header;