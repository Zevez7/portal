import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "./Firebase";

import { Add } from "@material-ui/icons/";
import { Typography } from "@material-ui/core";

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      setOpen: false,
      firstName: "",
      lastName: "",
      date: "",
      duplicateErrMsg: false
    };
  }

  addMember = () => {
    const refMember = firebase.database().ref(`member/`);
    refMember.push({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      date: this.state.date
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  // this prevents first name and last name from being the same
  // error message will sent and prevent submission to database
  handleDuplicate = () => {
    // this will find the array that matches the firstname and save it to firstNameDuplicate
    let checkDuplicate = this.props.memberList.filter(
      item =>
        item.firstName === this.state.firstName &&
        item.lastName === this.state.lastName
    );
    return checkDuplicate.length;
  };

  handleSubmit = () => {
    if (this.handleDuplicate()) {
      this.setState({ duplicateErrMsg: true });
    } else {
      this.handleClose();
      this.addMember();
      this.setState({
        duplicateErrMsg: false,
        firstName: "",
        lastName: "",
        date: ""
      });
    }
  };
  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  };

  render() {
    return (
      <>
        <Button size="large" color="primary" onClick={this.handleClickOpen}>
          <Add /> Add New Member
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle> Add New Member</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill out the form to add a new member.
              {/* will render once there's a duplicate first and last name on the memberList */}
              {this.state.duplicateErrMsg && (
                <Typography color="error">
                  First and last name combination was already taken. Please
                  change the first or last name to prevent duplicate names.
                </Typography>
              )}
            </DialogContentText>
            <TextField
              label="First Name"
              name="firstName"
              value={this.state.firstName}
              type="text"
              margin="dense"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={this.state.lastName}
              type="text"
              margin="dense"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              label="Start Date"
              name="date"
              value={this.state.date}
              type="date"
              margin="dense"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
