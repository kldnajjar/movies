import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { paginate } from "../util/paginate.js";

import MoviesTable from "./moviesTable";
import ListGroup from "../components/common/listGroup";
import Pagination from "../components/common/pagination";
import Searchbox from "../components/common/searchBox";

import { getMovies, deleteMovie } from "../services/moviesService";
import { getGenres } from "../services/genresService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sort: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    console.log("Mount");
    const result = await getGenres();
    const genres = [{ _id: 0, name: "All Generes" }, ...result];
    const movies = await getMovies();

    this.setState({
      movies,
      genres,
      selectedGenre: genres[0]
    });
  }

  componentDidUpdate() {
    console.log("Updated");
  }

  componentWillUnmount() {
    console.log("Will unmount");
  }

  deleteMovie = async movie => {
    const originalMovies = this.state.movies;
    const movies = [...originalMovies.filter(m => movie._id !== m._id)];

    this.setState({ movies, currentPage: 1 });

    try {
      await deleteMovie(movie._id);
    } catch (err) {
      if (err.response && err.response.status === 404)
        toast.error("This movie already been deleted!");

      this.setState({ originalMovies });
    }
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
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
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
      selectedGenre,
      searchQuery
    } = this.state;

    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filteredMovies, sort.path, sort.order);
    const movies = paginate(sorted, currentPage, pageSize);

    const data = {
      count: filteredMovies.length,
      items: movies
    };

    return data;
  };

  handleSearch = query => {
    const { genres } = this.state;
    this.setState({
      selectedGenre: genres[0],
      currentPage: 1,
      searchQuery: query
    });
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      genres,
      sort,
      searchQuery,
      selectedGenre
    } = this.state;

    const { user } = this.props;

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
            {user && (
              <Link to="/movies/new" className="btn btn-primary mb-3">
                New Movie
              </Link>
            )}
            <h4 className="mb-4">Showing {count} movies in the database.</h4>
            <Searchbox value={searchQuery} onChange={this.handleSearch} />
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
