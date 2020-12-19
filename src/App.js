import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import CreateItem from "./components/create-item.component.js";
import CreationSuccess from "./components/creation-success.component.js"

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={CreateItem} />
      <Route path="/create" exact component={CreateItem} />
      <Route path="/success" exact component={CreationSuccess} />
      </div>
    </Router>
  );
}

export default App;
