import React, { Component } from "react";
import {
  Button,
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
import Firebase from "./Firebase";

import { Delete } from "@material-ui/icons/";

const deleteStyle = {
  Box: {
    width: 50,
    height: 40
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
      setOpen: false
    };
  }

  deletePerk = () => {
    const ref = Firebase.database().ref(`perk/${this.props.perkID}`);
    ref.remove();
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleSubmit = () => {
    this.handleClose();
    this.deletePerk();
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <>
        <Box style={deleteStyle.Box} onClick={this.handleClickOpen}>
          <Delete />
        </Box>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <List dense="true" style={deleteStyle.List}>
                <ListItem>
                  <ListItemText primary={`${this.props.name}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`${this.props.city}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`${this.props.website}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`${this.props.perk}`} />
                </ListItem>
              </List>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
