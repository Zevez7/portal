import React from "react";
import firebase from "./Firebase";

// this file is a higher order component
// this component is added to all pages that require a firebase login auth
// pages that require this includes, admin, perks, portal
// redirect to home page if user is not logged in

const withAuth = WrappedComponent => {
  class WithAuth extends React.Component {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
        } else {
          return this.props.history.push("/");
        }
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return WithAuth;
};

export default withAuth;
