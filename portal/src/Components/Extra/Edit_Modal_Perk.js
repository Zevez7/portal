import React, { Component } from "react";
import {
  Button,
  TextField,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import firebase from "./Firebase";

import { Edit } from "@material-ui/icons/";

const editStyle = {
  Box: {
    width: 50,
    height: 40,
    paddingTop: "0.5em"
  },
  List: {
    color: "#000"
  }
};

export default class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      setOpen: false,
      name: this.props.name,
      city: this.props.city,
      website: this.props.website,
      perk: this.props.perk
    };
  }

  editPerk = () => {
    const refPerk = firebase.database().ref(`perk/${this.props.perkID}`);
    refPerk.update({
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
    this.editPerk();
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
              <List dense="true" style={editStyle.List}>
                <ListItem>
                  <ListItemText primary={`Name: ${this.props.name}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`City: ${this.props.city}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Website: ${this.props.website}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Perk: ${this.props.perk}`} />
                </ListItem>
              </List>
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
              type="text"
              margin="dense"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              label="Perk"
              name="perk"
              value={this.state.perk}
              type="text"
              margin="dense"
              multiline
              rows="4"
              fullWidth
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
