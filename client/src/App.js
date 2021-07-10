import React, { Component } from "react";
import "./App.scss";
import Footer from './components/Footer';
import Header from './components/Header';
import Playlist from './components/Playlist';
import Home from './components/Home';
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
      <div class=' text-center h-100 row align-items-center justify-content-center'>
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Playlist">
            <Playlist />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
      
      
      <Footer/>
    </div>
  );
}

export default App;
