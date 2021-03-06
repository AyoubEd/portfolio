import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./components/App";
import Blog from "./components/blog";
import Post from "./components/subcomponents/post";
import Menu from "./components/helpercomponents/menu";
import Footer from "./components/helpercomponents/footer";
import ScrollToTop from "./components/helpercomponents/ScrollToTop";

class RouterComponent extends React.Component {
  render() {
    const screenWidth = window.screen.width;

    return (
      <Router>
        <ScrollToTop />
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            flexFlow: "column"
          }}
        >
          <Menu onChangeUrl={this.onChangeUrl} />
          <div style={{ flexGrow: 1, marginTop: screenWidth <= 768 ? "0" : "10vh" }}>
            <Switch>
              <Route path="/" exact component={App} />
              <Route path="/:cat/*" exact component={Post} />
              <Route path="/*" render={props => <Blog {...props} />} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default RouterComponent;
