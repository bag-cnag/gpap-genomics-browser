


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




import igv from "../igv-dist/igv.esm";
import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class IGV extends React.Component {

    static propTypes = {
        igvOptions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.container = null;
        this.browser = null
    }

    setContainerElement = (element) => {
        this.container = element
    };

    render = () => <div ><div  className="igv-div" ref={this.setContainerElement} /></div>;

    componentDidMount() {

        if(this.props.token!== undefined){

            if (this.container) {
                igv.createBrowser(this.container,  this.props.config).then((browser) => {
                        this.browser = browser;
                   
                });


            }
        }


    }

    componentDidUpdate(prevProps)
     {
        if (this.browser && prevProps.igvOptions.tracks !== this.props.igvOptions.tracks) {
            this.browser.removeAllTracks();
            this.props.igvOptions.tracks.forEach((track) => {
                this.browser.loadTrack(track)
            })
        }
        if (this.browser && prevProps.igvOptions.locus !== this.props.igvOptions.locus) {
            console.log("sth changing");
            this.browser.search(this.props.igvOptions.locus)
        }
    }
}

function mapStateToProps (state) {
    if(state.authorization!==undefined)
    {
        return {token: state.authorization.idToken}
    }
}



//export default Login;

export default connect(mapStateToProps)(IGV);