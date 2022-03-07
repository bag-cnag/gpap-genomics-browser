
import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import auth from './Auth';
import {bindActionCreators} from "redux";
import * as Actions from "../actions/index";
import {connect} from "react-redux";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keycloak: null,
            authenticated: false
        }
    }


    componentDidMount() {

        let config =window.config;
        let {actions} = this.props;
        const keycloak = Keycloak(config.config_keycloak);

        if (this.props.location.state !== undefined){
            location.href=location.href +"?redirect="+ this.props.location.state.from.pathname + this.props.location.state.from.search ; 
            actions.addSearchParameters( this.props.location.state.from.search );
          
        }


        keycloak.init({onLoad: 'login-required', "checkLoginIframe" : false, promiseType: 'native'}).then(authenticated => {
                this.setState({ keycloak: keycloak, authenticated: authenticated });
                let appState = {
                    authenticated: authenticated,
                    keycloak: keycloak
                };
                auth.setToken(appState);
                actions.addAuthorization(keycloak);
                this.props.history.push(window.location.href.split("redirect=")[1])
            })
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) {
                return (<div>protected page</div>
                )
            } else return (<div>Unable to authenticate!</div>)
        }
        return (
            <div>Loading page</div>
        );
    }
}




function mapStateToProps (state) {
    return {
        authorization: state.authorization
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});



export default connect(mapStateToProps,mapDispatchToProps)(Login);