import React, { Component } from "react";
import { Link } from "react-router-dom";

import Like from "../components/common/like";
import Table from "../components/common/table";

class MoviesTable extends Component {
  render() {
    const { movies, onLike, onDelete, onSort, sort } = this.props;
    const columns = [
      {
        id: 1,
        path: "title",
        label: "Title",
        content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      },
      { id: 2, path: "genre.name", label: "Genre" },
      { id: 3, path: "numberInStock", label: "Stock" },
      { id: 4, path: "dailyRentalRate", label: "Rate" },
      {
        id: 5,
        content: movie => (
          <Like isLike={movie.isFav} onClick={() => onLike(movie)} />
        )
      },
      {
        id: 6,
        content: movie => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(movie)}
          >
            Delete
          </button>
        )
      }
    ];

    return (
      <Table onSort={onSort} sort={sort} columns={columns} items={movies} />
    );
  }
}

export default MoviesTable;
