import React, { Component } from 'react'
import Identicon from 'identicon.js'
import { PanelGroup } from 'react-bootstrap';

class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <p className="text-white">
            Vibranium Instant Exchange
          </p>

          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-sm-block">
              <small className="text-white pr-6">
                <small id="account">{this.props.account}</small>
              </small>
              { this.props.account 
            ? <img
          className = "ml-6"
        width = "30"
      height = "30"
    src = {`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
    alt=""
    />
    :<span></span>
            }
            </li>

          </ul>
          
        </nav>
        );

    }
}

        export default Navbar;