import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Table from "./table/Table.jsx";
import Col from "./table/Col.jsx";
import data from "./data.json";

function App() {
  return (
    <div className="App">
      <Table data={data}>
        <Col accessor="id" />
      </Table>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
