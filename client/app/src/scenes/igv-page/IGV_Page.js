

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
import "./igv-page.css";
import {connect} from "react-redux";
import IGV from "./components/igv-browser/IGV";


function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

class IGV_Page extends Component {

    constructor(props) {
        super(props);

        this.igv_default = {genome: 'hg38', locus: 'BRCA1'};
        this.state = {
            experimentName: undefined,
            locusFull: "",
            serverAuthorization: false,
            login_details: undefined,
            failed: false
        }
    }
    
    
    
    componentDidMount() {

       
        let experimentName = getUrlVars()['file'];
        let chrom = getUrlVars()['chrom'];
        let locus = getUrlVars()['locus'];
        let locus_full = chrom + ":" + locus;

        this.setState({
            experimentName: experimentName,
            chrom: chrom,
            locus: locus_full
        })

    }


    render(){
      
        let config = window.config;
        let {server_url} = config;
        let { token } = this.props;
        let { experimentName, locus } = this.state;
      
        let track = [
            {
                type: 'alignment',
                sourceType: 'htsget',
                endpoint: server_url,
                id: experimentName,
                name: experimentName,
                oauthToken: token
            }
        ];

        let igv_EGA_ServerOptions = {
            genome: "hg19",
            locus: locus,
            tracks: track
        };

        if(this.props.authenticated && this.state.experimentName!== undefined)
        {
            return <React.Fragment>
                <IGV config={igv_EGA_ServerOptions} track = {track} chrom={this.state.chrom}/>
            </React.Fragment>
        }
        else if(this.state.experimentName === undefined)
        {
            return <div className={"error_msg"}>
                <div>Please provide an Experiment ID</div>
                <div>E.g.  ...browser/?file=EXPERIMENTID&chrom=18&locus=12650-12670</div>
            </div>
        }

    }
}


function mapStateToProps (state) {
    if(state.authorization!==undefined)
    {
        return {token: state.authorization.token, authenticated:state.authorization }
    }
}

//export default Login;

export default connect(mapStateToProps)(IGV_Page);
