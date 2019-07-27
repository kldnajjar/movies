import React, { Component } from "react";
import { Link } from "react-router-dom";

import auth from "../services/authService";
import Like from "../components/common/like";
import Table from "../components/common/table";

class MoviesTable extends Component {
  columns = [
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
        <Like isLike={movie.isFav} onClick={() => this.onLike(movie)} />
      )
    }
  ];

  deleteButton = {
    id: 6,
    content: movie => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.onDelete(movie)}
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteButton);
  }

  render() {
    const { movies, onSort, sort } = this.props;
    return (
      <Table
        onSort={onSort}
        sort={sort}
        columns={this.columns}
        items={movies}
      />
    );
  }
}

MoviesTable.defaultProps = {
  user: null
};

export default MoviesTable;
