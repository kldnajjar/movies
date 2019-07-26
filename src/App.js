import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";

import ProctecRoute from "./components/common/protectedRoute";
import NavBar from "./components/navbar";
import auth from "./services/authService";

import Customers from "./pages/customers";
import Rentals from "./pages/rentals";
import Movies from "./pages/movies";
import MovieForm from "./pages/movieForm";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Register from "./pages/register";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customers} />
            <ProctecRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            />
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
