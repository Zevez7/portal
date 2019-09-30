import React, { Component } from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { DateTime, Interval } from "luxon";
import { ReactComponent as Boatlogo } from "../images/boatlogo.svg";

const portal = {
  Typo_Portal: {
    marginTop: "3rem",
    padding: "1rem",
    textTransform: "uppercase",
    textAlign: "center",
    alignItems: "center",
    borderBottom: "3px solid #84163A",
    marginBottom: "2rem",
    fontWeight: 700
  },
  Membership: {
    textAlign: "center",
    alignItems: "center"
  },
  Boat: {
    maxHeight: 300
  },
  MembershipBox: {
    borderBottom: "1px solid #e0e0e0",
    borderLeft: "1px solid #e0e0e0"
  },
  Date: {
    textAlign: "center",
    alignItems: "center"
  },
  DateBox: {
    borderBottom: "1px solid #e0e0e0",
    borderRight: "1px solid #e0e0e0"
  },
  Current: {
    textAlign: "center",
    alignItems: "center",
    paddingTop: "1rem",
    paddingBottom: "2rem",
    fontWeight: 700,
    borderBottom: "1px solid #e0e0e0"
  },
  Disclaimer: {
    paddingTop: "1rem"
  }
};

export default class Portal extends Component {
  constructor(props) {
    super(props);

    // portal using localStorage once Home filters out the user based on first and last name.
    // this way will not have to pass filtered user state back to parent app and repass it to portal
    // since filtered user does not change data themselves, it doesn't need to be realtime rendered from DB
    let userFilteredData = JSON.parse(localStorage.getItem("userFilteredData"));

    this.state = {
      userFilteredData: userFilteredData
    };
  }

  // getting local time
  dateNow = () => DateTime.local();

  // convert the string time into luxon date time
  // ISO string must be in the form of YYYY-MM-DD
  // datatime luxon object converted to localstring
  dateFormat = dateData =>
    DateTime.fromISO(dateData).toLocaleString(DateTime.DATE_FULL);

  // addOneYear
  dateAddOneYear = dateData =>
    DateTime.fromISO(dateData)
      .plus({ years: 1 })
      .toLocaleString(DateTime.DATE_FULL);

  componentDidMount() {
    console.log(this.state.userFilteredData);
  }

  render() {
    let active;

    // using an if-else statement to render active or inactive based on if the
    // dateNow(today's date) is within the date interval started and once year later
    // must check if userFilterData has been populated and interval is true before
    // setting let active to be active string
    if (
      this.state.userFilteredData &&
      Interval.fromDateTimes(
        DateTime.fromISO(this.state.userFilteredData[0].date),
        DateTime.fromISO(this.state.userFilteredData[0].date).plus({
          years: 1
        })
      ).contains(this.dateNow())
    ) {
      active = (
        <Typography variant="h4" color="primary">
          ACTIVE
        </Typography>
      );
    } else {
      active = (
        <Typography variant="h4" color="secondary">
          INACTIVE
        </Typography>
      );
    }

    return (
      <>
        <Boatlogo style={portal.Boat} className="svg" alt="design" />



        {this.state.userFilteredData &&
          this.state.userFilteredData.map(item => (
            <>
              <Box>
                <Typography style={portal.Typo_Portal} variant="h4">
                  {item.firstName} {item.lastName}
                </Typography>
              </Box>
              <Grid container spacing={1} justify="center">
                <Grid item xs={12}>
                  <Typography variant="h4" style={portal.Current}>
                    {active}
                  </Typography>
                </Grid>
                <Grid style={portal.MembershipBox} item xs={6} sm={6}>
                  <Typography variant="h6" style={portal.Membership}>
                    START
                  </Typography>
                </Grid>
                <Grid style={portal.DateBox} item xs={6} sm={6}>
                  <Typography variant="h6" style={portal.Date}>
                    {this.dateFormat(item.date)}
                  </Typography>
                </Grid>
                <Grid style={portal.MembershipBox} item xs={6} sm={6}>
                  <Typography variant="h6" style={portal.Membership}>
                    EXPIRE
                  </Typography>
                </Grid>
                <Grid style={portal.DateBox} item xs={6} sm={6}>
                  <Typography variant="h6" style={portal.Date}>
                    {this.dateAddOneYear(item.date)}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography style={portal.Disclaimer}>
                    Driver's license's name must match
                    <strong>
                      {" "}
                      "{item.firstName} {item.lastName}"{" "}
                    </strong>
                    and Membership must be <strong>active</strong> to redeem the
                    discount.
                  </Typography>
                  <Typography style={portal.Disclaimer}>
                    Incorrect information? Please Contact Linda@naaap.org.
                  </Typography>
                </Grid>
              </Grid>
            </>
          ))}
      </>
    );
  }
}
