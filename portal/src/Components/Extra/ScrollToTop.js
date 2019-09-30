import { Component } from "react";
import { withRouter } from "react-router-dom";

// component is required by react-router to scroll pages to top when refreshed
// without component all refreshed page would stay at the previous page scroll position

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
