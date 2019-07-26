import React from "react";
import Joi from "joi-browser";
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
    try {
      console.log("submitted");
      await auth.login(this.state.data);
      window.location = "/";
    } catch (err) {
      if (err.response) {
        const errors = { ...this.state.erros };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
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
