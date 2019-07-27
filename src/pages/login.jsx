import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import Form from "../components/common/form";
import auth from "../services/authService";

class Login extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    const { state } = this.props.location;
    const { data, errors: errs } = this.state;
    try {
      console.log("submitted");
      await auth.login(data);
      window.location = state ? state.from.pathname : "/";
    } catch (err) {
      if (err.response) {
        const errors = { ...errs };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <h1>Login</h1>
        <form className="mt-4" onSubmit={this.handleSubmit}>
          {this.renderInput(
            "username",
            "Username",
            "Enter a username",
            "text",
            true
          )}

          {this.renderInput(
            "password",
            "Password",
            "Enter password",
            "password"
          )}

          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
