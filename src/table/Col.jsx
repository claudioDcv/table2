import React, { PureComponent, Fragment } from "react";

class Col extends PureComponent {
  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

export default Col;
