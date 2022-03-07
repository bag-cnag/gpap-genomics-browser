

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
import igv from "../../../../../extra/myIGV";
import "./igv-browser.css";
import {connect} from "react-redux";

window.igvGlobal = igv;

class IGV_Browser extends Component {

    constructor(props){
        super(props);

        this.state = {
            pos: 0,
            igvBrowser: undefined
        };

        this.createBrowser = this.createBrowser.bind(this);
    }

    componentDidMount() {

        // check authorization;

        this.createBrowser();
    }


    createBrowser(){
        let self = this;
        let igvContainer = document.getElementsByClassName('igv-div');
        igv.createBrowser(igvContainer, this.props.config)
            .then(function (browser) {
                console.log("Created IGV browser");
                window.browserGlobal = browser;
                self.setState({igvBrowser: browser})
            });

    }

    componentWillUnmount() {
        igv.removeBrowser()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevState.igvBrowser!== undefined && this.state.igvBrowser !== undefined)
        {
            if(prevProps.config.locus!== this.props.config.locus) {
                this.state.igvBrowser.search(this.props.config.locus)
            }
        }


    }


    render() {

        return (
            <div className="igv-div"/>
        );
    }
}


function mapStateToProps (state) {
    if(state.authorization!==undefined)
    {
        return {token: state.authorization.idToken}
    }
}

/*const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});*/



//export default Login;

export default connect(mapStateToProps)(IGV_Browser);