import React, { Component } from "react";

class Login extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form className="mt-4">
          <div className="form-group">
            <label htmlFor="usename">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="userHelp"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordField">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordField"
              aria-describedby="passwordHelp"
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
