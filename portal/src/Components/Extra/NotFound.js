import React, { Component } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const notFound = {
  Paper: {
    textTransform: "uppercase",
    padding: "3rem",
    margin: "3rem",
    textAlign: "center"
  },
  Typo: {
    padding: "2rem"
  },
  Typo2: {
    margin: "2rem",
    color: "black",
    fontSize: "2rem",
    backgroundColor: "WhiteSmoke"
  }
};

export default class NotFound extends Component {
  render() {
    return (
      <>
        <Paper style={notFound.Paper}>
          <Typography variant="h3" style={notFound.Typo.Typo2}>
            Page Does Not Exist
          </Typography>
          <Link to="/">
            <Button style={(notFound.Typo, notFound.Typo2)}>
              Return to Home Page
            </Button>
          </Link>
        </Paper>
      </>
    );
  }
}
