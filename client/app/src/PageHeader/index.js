



import React, {Component} from 'react'
import Header from './components/Header'
import "./pageheader.css";

class PageHeader  extends Component {
    render() {
        return (
            <div className="navBar_container">
                <Header />
                {this.props.children}
            </div>
        )
    }
}

export default PageHeader;