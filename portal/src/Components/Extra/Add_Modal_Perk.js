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

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      setOpen: false,
      city: "",
      name: "",
      website: "",
      perk: ""
    };
  }

  addPerk = () => {
    const refPerk = firebase.database().ref(`perk/`);
    refPerk.push({
      name: this.state.name,
      city: this.state.city,
      website: this.state.website,
      perk: this.state.perk
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleSubmit = () => {
    this.handleClose();
    this.addPerk();
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
        <Button size="large" color="primary" onClick={this.handleClickOpen}>
          <Add /> Add Perk
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle> Add Perk</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill out the form to add a new perk.
            </DialogContentText>
            <TextField
              label="Name"
              name="name"
              value={this.state.name}
              type="text"
              margin="dense"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              label="City"
              name="city"
              value={this.state.city}
              type="text"
              margin="dense"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              label="Website (Ex https://www.google.com/)"
              name="website"
              value={this.state.website}
              type="url"
              margin="dense"
              fullWidth
              onChange={this.handleChange}
            />{" "}
            <TextField
              label="Perk"
              name="perk"
              value={this.state.perk}
              type="text"
              margin="dense"
              fullWidth
              onChange={this.handleChange}
              multiline
              rows="4"
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
