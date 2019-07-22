import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    let order = "asc";
    if (this.props.sort.path === path)
      order = this.props.sort.order === "asc" ? "desc" : "asc";

    const sort = { path, order };
    this.props.onSort(sort);
  };

  renderIcon = column => {
    const { sort } = this.props;

    if (sort.path && sort.path !== column.path) return null;

    if (sort.path && sort.order === "asc")
      return <i className="fa fa-sort-asc" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.id}
              scope="col"
              className="clickable"
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
