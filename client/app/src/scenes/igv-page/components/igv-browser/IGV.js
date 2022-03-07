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