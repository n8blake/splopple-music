import React, { Component } from "react";
import "./App.scss";
import Footer from './components/Footer';
import Header from './components/Header';
import Playlist from './components/Playlist';
import Home from './components/Home';
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
      <div>
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
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
