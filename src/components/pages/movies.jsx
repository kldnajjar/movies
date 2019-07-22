import React, { Component } from "react";
import _ from "lodash";

import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import { paginate } from "../../util/paginate.js";

import MoviesTable from "../moviesTable";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sort: { path: "title", order: "asc" },
    selectedGenre: null
  };

  componentDidMount() {
    console.log("Mount");
    const data = { _id: 0, name: "All Generes" };
    const genres = getGenres();
    genres.unshift(data);
    this.setState({ movies: getMovies(), genres, selectedGenre: genres[0] });
  }

  componentDidUpdate() {
    console.log("Updated");
  }

  componentWillUnmount() {
    console.log("Will unmount");
  }

  deleteMovie = movie => {
    const movies = this.state.movies.filter(m => movie._id !== m._id);
    this.setState({ movies });
  };

  increment = movie => {
    const movies = this.state.movies;
    const index = movies.indexOf(movie);

    movies[index].numberInStock = movies[index].numberInStock + 1;
    this.setState({ movies });
  };

  likeMovie = movie => {
    const movies = this.state.movies;
    const index = movies.indexOf(movie);

    movies[index].isFav = !movies[index].isFav;
    this.setState({ movies });
  };

  handleOnPageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelection = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  sortMovies = sort => {
    this.setState({ sort });
  };

  getMovieData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      sort,
      selectedGenre
    } = this.state;

    const filteredMovies =
      selectedGenre._id !== 0
        ? allMovies.filter(m => {
            return m.genre._id === selectedGenre._id;
          })
        : allMovies;

    const sorted = _.orderBy(filteredMovies, sort.path, sort.order);
    const movies = paginate(sorted, currentPage, pageSize);

    const data = {
      count: filteredMovies.length,
      items: movies
    };

    return data;
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      genres,
      sort,
      selectedGenre
    } = this.state;

    if (!allMovies.length) return "There are no movies in the database.";

    const { items, count } = this.getMovieData();

    return (
      <div className="wrapper my-4">
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={genres}
              selectedGenre={selectedGenre}
              onSelectGenre={this.handleGenreSelection}
            />
          </div>
          <div className="col">
            <h4 className="mb-4">Showing {count} movies in the database.</h4>
            <MoviesTable
              movies={items}
              sort={sort}
              onLike={this.likeMovie}
              onDelete={this.deleteMovie}
              onSort={this.sortMovies}
            />
            <Pagination
              itemCounts={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handleOnPageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
