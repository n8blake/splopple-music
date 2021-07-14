import React, { Component } from "react";
import "./App.scss";
import Footer from './components/Footer';
import Header from './components/Header/Header';
import Playlist from './components/Playlist/Playlist';
import Login from './components/Login/Login';
import { StoreProvider } from './utils/GlobalState';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Header/>
        <div >
          <Switch>
            <Route exact path="/Login">
              <Login />
            </Route>
            <Route exact path="/">
              <Playlist />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer/>
      </StoreProvider>
  );
}

export default App;
