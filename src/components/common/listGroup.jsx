import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { genres, onSelectGenre, id, value, selectedGenre } = this.props;
    return (
      <ul className="list-group">
        {genres.map(genre => {
          return (
            <li
              key={genre[id]}
              style={{ cursor: "pointer" }}
              className={
                selectedGenre === genre
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={() => onSelectGenre(genre)}
            >
              {genre[value]}
            </li>
          );
        })}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  id: "_id",
  value: "name"
};

export default ListGroup;
