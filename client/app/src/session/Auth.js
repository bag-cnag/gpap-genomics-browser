
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


