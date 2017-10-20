import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <section>
          <h4 className="menu-item">
            <Link className="navbar-brand" to="/" src="/images/logo.jpg">HOME</Link>
          </h4>
        </section>
        <section>
          <h4 className="menu-item">
            <Link className="navbar-brand" to="/campuses" >CAMPUSES</Link>
          </h4>
        </section>
        <section>
          <h4 className="menu-item">
            <Link className="navbar-brand" to="/students" >STUDENTS</Link>
          </h4>
        </section>
      </nav>
    );
  }
}
