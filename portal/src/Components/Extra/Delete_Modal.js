import React, { Component } from "react";
import {
  Button,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog
} from "@material-ui/core";
import Firebase from "./Firebase";

import { Delete } from "@material-ui/icons/";

const editStyle = {
  Box: {
    width: 50,
    height: 40
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

  deleteMember = () => {
    const ref = Firebase.database().ref(`member/${this.props.memberID}`);
    ref.remove();
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleSubmit = () => {
    this.handleClose();
    this.deleteMember();
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <>
        <Box style={editStyle.Box} onClick={this.handleClickOpen}>
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
              {this.props.firstName} {this.props.lastName}, {this.props.date}
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
