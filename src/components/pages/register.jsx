import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";

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

  doSubmit = () => {
    console.log("register submitted");
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
