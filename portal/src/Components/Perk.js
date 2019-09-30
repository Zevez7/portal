import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Box, Typography, Grid, Paper, Link } from "@material-ui/core";

const perk = {
  Title: {
    marginTop: "3rem",
    padding: "1rem",
    textTransform: "uppercase",
    textAlign: "center",
    alignItems: "center",
    whitespace: "pre-line",
    borderBottom: "3px solid #84163A"
  },
  BoxUnit: {
    padding: "1rem",
    marginTop: "1rem"
  },
  Spacing: {
    height: 40
  }
};
export default class Perk extends Component {
  render() {
    const myPerk =
      this.props.perkList &&
      this.props.perkList.map(item => (
        <Paper style={perk.BoxUnit}>
          <Grid container spacing={0} justify="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography>{item.city}</Typography>
              <Typography>
                <Link href={item.website} target="_blank" rel="noreferrer">
                  Website
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography>{item.perk}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ));

    return (
      <>
        <Box>
          <Typography style={perk.Title} variant="h4">
            Membership Perks
          </Typography>
        </Box>

        {myPerk}
        <div style={perk.Spacing}></div>

        {/* redirect user out of perks page if not logged in, 
but first check if user data has been populated */}
        {this.props.user && this.props.user ? null : <Redirect to="/" />}
      </>
    );
  }
}
