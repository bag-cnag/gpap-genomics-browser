

import jwt_decode from 'jwt-decode';

export  default  {

    user: {
        authenticated: false,
        access_token: ''
    },
    checkAuth() {
       
        var jwt = localStorage.getItem('access_token');
        (jwt) ? this.user.authenticated = true : this.user.authenticated = false

    },
    getToken(){

        if (this.user.keycloak!=undefined)
        {
            return this.user.keycloak.token; }
        else
        {
            return null;
        }
    },
    decoded(){
        if (this.user.keycloak!==undefined)

            return jwt_decode(this.user.keycloak.token);
        else
            return "empty"
    },
    setToken(user){
        this.user=user;
        this.user.authenticated = true;
        console.log(this.user);
    },

    // get the username information
    getUser(){

        return this.user;
    }

}


