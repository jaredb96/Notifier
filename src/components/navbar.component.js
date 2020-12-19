import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg" style={{justifyContent: 'center'}}>
        <Link to="/" className="navbar-brand">
          <h2>Notifier</h2>
        </Link>
      </nav>
    );
  }
}
