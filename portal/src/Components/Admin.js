import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import { DateTime, Interval } from "luxon";
import AddModal from "./Extra/Add_Modal";
import AddModalPerk from "./Extra/Add_Modal_Perk";
import EditModal from "./Extra/Edit_Modal";
import DeleteModal from "./Extra/Delete_Modal";
import DeleteModalPerk from "./Extra/Delete_Modal_Perk";
import EditModalPerk from "./Extra/Edit_Modal_Perk";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab
} from "@material-ui/core";

const admin = {
  Typo_Portal: {
    marginTop: "3rem",
    padding: "1rem",
    textTransform: "uppercase",
    textAlign: "center",
    alignItems: "center",
    whitespace: "pre-line",
    borderBottom: "3px solid #84163A"
  },
  modalStyle: {
    color: "red"
  },
  Delete: {
    width: 50,
    height: 40,
    paddingTop: "0.6em"
  },
  Divider: {
    paddingTop: 40
  }
};

export default class Admin extends Component {
  // getting local time
  dateNow = () => DateTime.local();

  // convert the string time into luxon date time
  // ISO string must be in the form of YYYY-MM-DD
  // datatime luxon object converted to localstring
  dateFormat = dateData =>
    DateTime.fromISO(dateData).toLocaleString(DateTime.DATE_MED);

  checkActive = dateData =>
    Interval.fromDateTimes(
      DateTime.fromISO(dateData),
      DateTime.fromISO(dateData).plus({ years: 1 })
    ).contains(this.dateNow());

  render() {
    const Active = <Typography variant="inherit">active</Typography>;
    const Inactive = (
      <Typography variant="inherit" color="secondary">
        inactive
      </Typography>
    );

    const myMember =
      this.props.memberList &&
      this.props.memberList.map(item => (
        <TableRow key={item.memberID}>
          <TableCell component="th" scope="row">
            {item.lastName}
          </TableCell>
          <TableCell align="right">{item.firstName}</TableCell>
          <TableCell align="right">{this.dateFormat(item.date)}</TableCell>
          <TableCell align="right">
            {this.checkActive(item.date) ? Active : Inactive}
          </TableCell>
          <TableCell align="center">
            <Fab color="primary" size="small">
              <EditModal
                firstName={item.firstName}
                lastName={item.lastName}
                date={item.date}
                memberID={item.memberID}
              />
            </Fab>
          </TableCell>
          <TableCell align="center">
            <Fab color="secondary" size="small">
              <Box style={admin.Delete}>
                <DeleteModal
                  firstName={item.firstName}
                  lastName={item.lastName}
                  date={item.date}
                  memberID={item.memberID}
                />
              </Box>
            </Fab>
          </TableCell>
        </TableRow>
      ));

    const myPerk =
      this.props.perkList &&
      this.props.perkList.map(item => (
        <TableRow key={item.perkID}>
          <TableCell component="th" scope="row">
            {item.name}
          </TableCell>
          <TableCell align="right">{item.city}</TableCell>
          <TableCell align="right">{item.website}</TableCell>
          <TableCell align="right">{item.perk}</TableCell>
          <TableCell align="center">
            <Fab color="primary" size="small">
              <EditModalPerk
                name={item.name}
                city={item.city}
                website={item.website}
                perk={item.perk}
                perkID={item.perkID}
              />
            </Fab>
          </TableCell>
          <TableCell align="center">
            <Fab color="secondary" size="small">
              <Box style={admin.Delete}>
                <DeleteModalPerk
                  name={item.name}
                  city={item.city}
                  website={item.website}
                  perk={item.perk}
                  perkID={item.perkID}
                />
              </Box>
            </Fab>
          </TableCell>
        </TableRow>
      ));

    return (
      <>
        <Box>
          <Typography style={admin.Typo_Portal} variant="h4">
            Administrator
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" align="center" gutterBottom={true}>
            Best viewed with widescreen display.
          </Typography>
        </Box>

        {/* user table */}
        <Table>
          <AddModal memberList={this.props.memberList} />
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Last Name</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Start</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{myMember}</TableBody>
            </Table>
          </Paper>
        </Table>
        <div style={admin.Divider}></div>
        {/* business table */}
        <Table>
          <AddModalPerk />
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">City</TableCell>
                  <TableCell align="right">Website</TableCell>
                  <TableCell align="right">Perk</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{myPerk}</TableBody>
            </Table>
          </Paper>
        </Table>
        <div style={admin.Divider}></div>

        {/* redirect user out of perks page if not logged in, 
but first check if user data has been populated */}
        {this.props.user && this.props.user ? null : <Redirect to="/" />}
      </>
    );
  }
}
