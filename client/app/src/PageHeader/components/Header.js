

/* 
<GPAP Genomics Browser, a standalone react application that embeds an IGV.js browser for visualization of genomic alignments>
   Copyright (C) <2022>  <CRG-CNAG>

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Affero General Public License as published
   by the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.

For more information you can contact the authors at platform@rd-connect.eu  */

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