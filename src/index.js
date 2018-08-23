import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Table from "./table/Table.jsx";
import Col from "./table/Col.jsx";
import data from "./data.json";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data,
    };

    this.handlerOnClick = this.handlerOnClick.bind(this);
    this.handlerOnRemove = this.handlerOnRemove.bind(this);
  }

  handlerOnClick() {
    this.setState((prevState) => {
      const l = prevState.data;
      l.push({
        "id": 1,
        "name": "Claudio",
        "extra": {
          "country": "Chile"
        }
      });
      return {
        ...prevState,
        data: l,
      }
    });
  }

  handlerOnRemove(element, index, data) {
    this.setState((prevState) => {
      const l = prevState.data.filter((e, i) => {
        return i !== index;
      });
      return {
        ...prevState,
        data: l,
      }
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handlerOnClick}>Add</button>
        <Table data={this.state.data}>
          <Col
            isNumeric
            accessor="id"
            className="color-danger"
          />
          <Col
            accessor="name"
          />
          <Col
            title="Acción"
            className="color-danger"
            template={(e, i, d) => <button onClick={() => {
              this.handlerOnRemove(e, i ,d);
            }}>{d.id} [>] </button>}
          />
          <Col
            defaultSort
            accessor="extra.country"
            template={(e, i, d) => (<strong>-{i}-</strong>)}
          />
        </Table>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
