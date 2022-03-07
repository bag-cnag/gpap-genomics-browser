

import React from 'react';
import { Route,Redirect } from "react-router-dom";



function AuthenticatedRoute({component: Component,enabled,  ...rest}) {
    return (
        <Route
            {...rest}
            render={ (props) => {

                return (
                    auth.user.authenticated === true || !enabled ? <Component username = {auth.user.username} group={auth.user.group} {...props} {...rest} />
                        : (
                            <Redirect
                                to={{
                                    pathname: "/login/",
                                    state: {from: props.location}
                                }}
                            />
                        )

                );
            }
            } />
    )
}



export default AuthenticatedRoute;