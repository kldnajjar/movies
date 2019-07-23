import React, { Component } from "react";

class Input extends Component {
  /**
   *  Create a ref
   *  usernameRef = React.createRef();
   *  componentDidMount() {
   *       this.usernameRef.current.focus();
   *   }
   *
   */

  render() {
    const {
      name,
      label,
      error,
      ariaDescribedby,
      isFocus,
      ...reset
    } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          autoFocus={isFocus}
          id={name}
          name={name}
          aria-describedby={ariaDescribedby}
          className="form-control"
          {...reset}
          //   ref={this.usernameRef}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

Input.defaultProps = {
  isFocus: false,
  autoComplete: "off",
  ariaDescribedby: "",
  type: "text"
};

export default Input;
