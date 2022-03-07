


import React, {Component}from 'react';
import CNAG_IMAGE from "./cnag.png";



class AppName extends Component {

    render() {
        return (
            <div className='appname'>
                <img
                    style={{width:"40%"}}
                    src={CNAG_IMAGE}/>
            </div>

        )

    }

}


export default AppName;