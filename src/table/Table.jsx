import React, { Component } from "react";
import { compareMake } from "./TableUtils";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      sortBy: "value",
      reverse: false,
      isNumeric: false
    };
    this.onSort = this.onSort.bind(this);
  }

  onSort(key, isNumeric) {
    const { sortBy, reverse } = this.state;
    this.setState({
      sortBy: key,
      reverse: sortBy === key ? !reverse : false,
      isNumeric: isNumeric !== undefined
    });
  }

  render() {
    const { data, sortBy, reverse, isNumeric } = this.state;
    return (
      <div>
        {JSON.stringify(reverse)} -
        {JSON.stringify(isNumeric)}
        <button onClick={() => this.onSort("id", true)}>id</button>
        <button onClick={() => this.onSort("value")}>name</button>
        <button onClick={() => this.onSort("extra.country")}>country</button>
        {JSON.stringify(data.sort(compareMake(sortBy, reverse, isNumeric)))}
        {data.map(e => <strong>{e.id}</strong>)}
      </div>
    );
  }
}

export default Table;
