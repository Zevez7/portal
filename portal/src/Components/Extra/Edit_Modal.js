import React, { Component } from "react";
import { Button, Box, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "./Firebase";

import { Edit } from "@material-ui/icons/";

const editStyle = {
  Box: {
    width: 50,
    height: 40,
    paddingTop: "0.5em"
  }
};

export default class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      setOpen: false,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      date: this.props.date
    };
  }

  editMember = () => {
    const refMember = firebase.database().ref(`member/${this.props.memberID}`);
    refMember.update({
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

  handleSubmit = () => {
    this.handleClose();
    this.editMember();
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  };

  render() {
    return (
      <>
        <Box style={editStyle.Box} onClick={this.handleClickOpen}>
          <Edit />
        </Box>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.firstName} {this.props.lastName}, {this.props.date}
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
