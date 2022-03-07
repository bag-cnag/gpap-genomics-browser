

import React, {Component} from "react";

import PageHeader from "./PageHeader/index";
import { Route, Redirect } from 'react-router-dom'
import IGV_Page from "./scenes/igv-page/IGV_Page";

import Login from "./session/Login";
import Home from "./scenes/Home";
import auth from "./session/Auth";
import Footer from "./footer/Footer";


const config = window.config;

function AuthenticatedRoute({component: Component,enabled,  ...rest}) {
    return (
        <Route
            {...rest}
            render={
                (props) => (
                    auth.user.authenticated===true || !enabled
                        ? <Component {...props} {...rest} />
                        : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: props.location }
                                }}
                            />
                        )
                )
            } />
    )
}




class Main extends Component {


    render() {
        return (
            <div className="myContainer">
                <div className="navBar">
                    <PageHeader/>
                </div>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <AuthenticatedRoute  path="/browser" component={IGV_Page} enabled={config.security}/>
                    <Route path="/login" component={Login} render={(props) => <Login {...props} auth={this.state.auth}/>}/>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>)
    }
}


export default Main;