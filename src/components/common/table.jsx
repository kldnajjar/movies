import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component {
  render() {
    const { onSort, sort, columns, items } = this.props;
    return (
      <table className="table">
        <TableHeader columns={columns} onSort={onSort} sort={sort} />
        <TableBody columns={columns} items={items} />
      </table>
    );
  }
}

export default Table;
