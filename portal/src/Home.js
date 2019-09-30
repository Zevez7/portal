import React, { Component } from "react";
import firebase from "./Components/Extra/Firebase";
import { Link } from "react-router-dom";

import FormError from "./Components/Extra/FormError";
import naaplogo2 from "../images/naaplogo2.png";

import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button
} from "@material-ui/core";

import { VisibilityOff, Visibility } from "@material-ui/icons/";

const home = {
  Input: {
    textTransform: "capitalize"
  },
  Box: {
    marginTop: 40,
    fontWeight: 500,
    width: 300
  },
  National: {},
  Typo_Portal: {
    marginTop: "3rem",
    padding: "1rem",
    textTransform: "uppercase",
    textAlign: "center",
    alignItems: "center",
    whitespace: "pre-line",
    borderBottom: "3px solid #84163A"
  },
  Typo_Form: { marginTop: "1rem" },
  Form: {
    alignItems: "center",
    textAlign: "left",
    paddingTop: 20,
    paddingBottom: 50,
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 40
  },
  Button: {
    marginTop: 30,
    backgroundColor: "#28A745",
    fontSize: "2rem",
    paddingLeft: "1.3rem",
    paddingRight: "1.3rem",
    width: 280
  },
  ButtonAlign: {
    textAlign: "center"
  },
  BoxLogo: {
    textAlign: "center"
  },
  Logo: {
    alignItems: "center",
    height: 220,
    paddingTop: 50
  },
  Tampa: {
    fontWeight: 600,
    color: "#AF282D",
    textAlign: "center",
    letterSpacing: 5,
    paddingBottom: "0.5rem"
  },
  Spacer: {
    width: 20,
    height: 50
  }
};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: "",
      password: "",
      firstName: "",
      lastName: "",
      showPassword: false,
      errorMessage: null,
      nameError: null,
      redirect_signin_success: false,
      nameFailed: false,
      userFilteredData: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      // reset msg to prevent same error msg on second submit if msg have changed or is new
      errorMessage: null,
      nameError: null,
      nameFailed: false
    });
    var registrationInfo = {
      email: `${this.state.account}@naaap.org`,
      password: this.state.password
    };

    // check if email and password is correct to log user in
    firebase
      .auth()
      .signInWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .catch(error => {
        this.setState({
          errorMessage: "Account name or password is incorrect."
        });
        console.log(error.message);
        return Promise.reject();
      })
      // Check to see if user exist in database
      .then(() => {
        const refMember = firebase.database().ref("member/");
        refMember
          // will return a snapshot of data that is filtered by lastName input
          .orderByChild("lastName")
          .equalTo(`${this.state.lastName}`)
          .once("value", snapshot => {
            // userData will be null if lastName doesn't match
            let userData = snapshot.val();

            let userList = [];

            // loop through the nested object and create an object array
            // it also flatten out the nested object id into an one object
            // the array will hold userID, firstName, lastName, date
            for (let item in userData) {
              userList.push({
                userID: item,
                firstName: userData[item].firstName,
                lastName: userData[item].lastName,
                date: userData[item].date
              });
            }

            // filter out all the object firstName key to the inputted firstName
            // filter will return an array with the object key-value pair for each index
            // checkedFirstName will be
            let checkedFirstName = userList.filter(
              data => data.firstName === `${this.state.firstName}`
            );

            // this will check if the filtered array is empty for first name
            // empty array will be redirected back to home "/"
            if (checkedFirstName.length === 0) {
              this.props.logOutHandler();
              console.log(checkedFirstName.length);
              this.setState({ nameFailed: true });
              console.log(checkedFirstName);
            } else {
              // changing checkedFirstName to userFilteredData once it's confirmed to exist in the database
              this.setState({ userFilteredData: checkedFirstName });
              console.log(checkedFirstName);
              // add userFilteredData as localstorage for portal to use
              // updated userfilteredData would only get triggered with submit
              localStorage.setItem(
                "userFilteredData",
                JSON.stringify(this.state.userFilteredData)
              );
            }

            console.log(userList);
            console.log(userData);
          });
        this.props.userLogin(this.state.firstName, this.state.lastName);
      })
      .then(() => {
        if (this.state.nameFailed) {
          this.setState({
            nameError: "First or last name is incorrect."
          });
        } else {
          this.setState({
            // reset messages to empty on successful login
            errorMessage: null,
            nameError: null,
            nameFailed: false

          });
        }
      });
  };



  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  };

  render() {
    const LoginForm = (
      <Box display="flex" width="100%" justifyContent="center">
        <Paper style={home.Form}>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField
              style={home.Input}
              label="Account"
              value={this.state.Account}
              name="account"
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              inputProps={{ style: { textTransform: "lowercase" } }}
            />
            <TextField
              style={home.Input}
              type={this.state.showPassword ? "text" : "password"}
              label="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      edge="false"
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              style={home.Input}
              label="First Name"
              value={this.state.firstName}
              name="firstName"
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <br />
            <TextField
              style={home.Input}
              label="Last Name"
              value={this.state.lastName}
              name="lastName"
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <br />
            {this.state.errorMessage !== null ? (
              <FormError theMessage={this.state.errorMessage} />
            ) : null}
            {this.state.nameError !== null ? (
              <FormError theMessage={this.state.nameError} />
            ) : null}
            <br />
            <Box style={home.ButtonAlign}>
              <Button
                style={home.Button}
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    );

    const LinkButton = (
      <div>
        <Box style={home.ButtonAlign}>
          <Link to="/portal">
            <Button
              style={home.Button}
              variant="contained"
              color="primary"
              type="submit"
            >
              MEMBERSHIP
            </Button>
          </Link>
        </Box>
        <Box style={home.ButtonAlign}>
          <Link to="/perk">
            <Button
              style={home.Button}
              variant="contained"
              color="primary"
              type="submit"
            >
              PERKS
            </Button>
          </Link>
        </Box>
      </div>
    );

    // conditional display for displaySwitch to show sign in button or login form for non signed in user
    // must check if user has been rendered before checking to see if user is logged in or not
    // logged in user will be true, logged out user will be null/false
    const displaySwitch =
      this.props.user && this.props.user ? LinkButton : LoginForm;

    return (
      <>
        <Box style={home.BoxLogo}>
          <img src={naaplogo2} style={home.Logo} alt="logo" />
        </Box>
        <Box>
          <Typography style={home.Tampa} variant="h3">
            TAMPA BAY
          </Typography>
          <Typography style={home.Typo_Portal} variant="h4">
            Portal
          </Typography>
        </Box>

        {/* login form or button link depending on if user is logged in*/}
        {displaySwitch}

        <div style={home.Spacer}></div>
      </>
    );
  }
}
