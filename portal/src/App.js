import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import {
  CssBaseline,
  Typography,
  Button,
  Box,
  Container
} from "@material-ui/core/";
import ScrollToTop from "./Components/Extra/ScrollToTop";

import firebase from "./Components/Extra/Firebase";

import Home from "./Components/Home";
import Admin from "./Components/Admin";
import Portal from "./Components/Portal";
import Perk from "./Components/Perk";
import NotFound from "./Components/Extra/NotFound";

const style = {
  ShiftRight: { marginLeft: "auto" },

  Paper: {
    backgroundColor: "#AF282D",
    height: 50,
    color: "white",
    display: "flex",
    alignItems: "center",
    paddingLeft: 8
  },
  Logout: {
    backgroundColor: "#AF282D",
    color: "white",
    border: "none",
    boxShadow: "none",
    textDecoration: "none"
  },
  Link: {
    color: "white"
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect_logout_success: false,
      firstName: null,
      lastName: null
    };
  }

  memberListData = () => {
    const refMember = firebase.database().ref("member/");
    refMember.on("value", snapshot => {
      let member = snapshot.val();
      let memberList = [];

      for (let item in member) {
        memberList.push({
          memberID: item,
          firstName: member[item].firstName,
          lastName: member[item].lastName,
          date: member[item].date
        });
      }
      this.setState({
        memberList: memberList
      });
      console.log(this.state.memberList);
    });
  };

  perkListData = () => {
    const refPerk = firebase.database().ref("perk/");
    refPerk.on("value", snapshot => {
      let perk = snapshot.val();
      let perkList = [];

      for (let item in perk) {
        perkList.push({
          perkID: item,
          name: perk[item].name,
          city: perk[item].city,
          website: perk[item].website,
          perk: perk[item].perk
        });
      }
      this.setState({
        perkList: perkList
      });
      console.log(this.state.perkList);
    });
  };

  componentDidMount() {
    // when firebase is signed in onAuthStateChanged is triggered.
    // FBUser is the currentUser object that is passed into the argument.
    firebase.auth().onAuthStateChanged(FBUser => {
      // if there's a user. Set the state of the user to these values
      if (FBUser) {
        this.setState({
          user: FBUser
        });
        this.perkListData();
      } else {
        // if no user if found on auth change / sign-in, set user as null
        this.setState({ user: null });
      }
    });
  }

  userLogin = (firstName, lastName) => {
    this.setState({
      firstName: firstName,
      lastName: lastName
    });
    // when a user is full logged in through home component, the perkList and memberList is populated
    this.perkListData();
    // memberlist is only generated if lastName is admin
    if (this.state.lastName === "admin") {
      this.memberListData();
    }
  };

  logOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(result => {
        this.setState({
          firstName: null,
          lastName: null,
          user: null,
          redirect_logout_success: null,
          memberList: null,
          perkList: null
        });
      });
  };

  redirect_logout_successHandler = () => {
    this.setState({
      redirect_logout_success: true
    });
  };

  render() {
    const { memberList, perkList, user } = this.state;
    return (
      <Router>
        <CssBaseline />

        <ScrollToTop>
          <Box style={style.Paper}>
            <Link to="/" style={style.Link}>
              <Typography variant="h6"> HOME </Typography>
            </Link>
            <div style={style.ShiftRight}>
              {this.state.lastName === "admin" && (
                <Link to="/admin">
                  <Button style={style.Logout} variant="contained">
                    Admin
                  </Button>
                </Link>
              )}

              {/* logout button right shifted */}
              {/* if there is no user state, button is hidden, only when you are logged in is button shown. */}

              {this.state.user && (
                <Button
                  style={style.Logout}
                  variant="contained"
                  onClick={() => {
                    this.logOutHandler();
                    this.redirect_logout_successHandler();
                  }}
                >
                  Log Out
                </Button>
              )}
            </div>

            {/* logout redirect if successful */}
            {this.state.redirect_logout_success && <Redirect to="/" />}
          </Box>

          <Container>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home
                    {...props}
                    userLogin={this.userLogin}
                    logOutHandler={this.logOutHandler}
                    user={user}
                  />
                )}
              />

              <Route
                exact
                path="/portal"
                render={props => (
                  <Portal
                    {...props}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                  />
                )}
              />

              <Route
                exact
                path="/admin"
                render={props => (
                  <Admin
                    {...props}
                    memberList={memberList}
                    perkList={perkList}
                    user={user}
                  />
                )}
              />

              <Route
                exact
                path="/perk"
                render={props => (
                  <Perk {...props} perkList={perkList} user={user} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </ScrollToTop>
      </Router>
    );
  }
}
