import React, { Component } from "react";

import NavBar from "./components/navbar";
import Customers from "./components/pages/customers";
import Rentals from "./components/pages/rentals";
import Movies from "./components/pages/movies";
import MovieDetails from "./components/MovieDetails";
import NotFound from "./components/pages/notFound";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customers} />
            <Route path="/movies/:id" component={MovieDetails} />
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
