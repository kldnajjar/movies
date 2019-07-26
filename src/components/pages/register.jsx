import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import * as userService from "../../services/usersService";
import auth from "../../services/authService";

class Register extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username")
      .email(),
    password: Joi.string()
      .required()
      .label("Password")
      .min(5),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try {
      console.log("register submitted");
      const result = await userService.register(this.state.data);
      const token = result.headers["x-auth-token"];
      auth.setToken(token);
      window.location = "/";
    } catch (err) {
      if (err.response) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
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

          {this.renderInput("name", "Name", "Full Name")}

          {this.renderButton("Register")}
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
