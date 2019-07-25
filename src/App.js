import React, { Component } from "react";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/navbar";
import Customers from "./components/pages/customers";
import Rentals from "./components/pages/rentals";
import Movies from "./components/pages/movies";
import MovieForm from "./components/pages/movieForm";
import NotFound from "./components/pages/notFound";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import { Route, Switch, Redirect } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customers} />
            <Route path="/movies/new" component={MovieForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/notFound" component={NotFound} />
            <Redirect from="/" to="/movies" exact />
            <Redirect to="/notFound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
