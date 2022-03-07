



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