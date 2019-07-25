import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";

import { getMovie, saveMovie } from "../../services/moviesService";
import { getGenres } from "../../services/genresService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string().allow(""),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate")
  };

  populateGenres = async () => {
    const genres = await getGenres();
    this.setState({ genres });
  };

  populateMovies = async () => {
    try {
      const movieId = this.props.match.params.id || null;
      if (!movieId || movieId === "new") return;

      const movie = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (err) {
      if (err.response && err.response.status === 404)
        this.props.history.replace("/notFound");
    }
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    console.log("new movies submitted");
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form className="mt-4" onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "", "text", true)}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
