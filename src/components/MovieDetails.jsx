import React, { Component } from "react";

class MovieDetails extends Component {
  handleSave = () => {
    this.props.history.replace("/movies");
  };
  render() {
    return (
      <React.Fragment>
        <h4>Movie From {this.props.match.params.id}</h4>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleSave}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default MovieDetails;
