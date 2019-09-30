import React, { Component } from "react";

const msgStyle = {
  color: "red",
  paddingTop: "1rem"
};

export default class FormError extends Component {
  render() {
    const { theMessage } = this.props;
    return (
      <>
        <div style={msgStyle}>{theMessage}</div>
      </>
    );
  }
}
