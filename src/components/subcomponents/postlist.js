import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
//Material UI imports
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

//Components

//File Imports
import * as lists from "../lists";

const styles = {
  postTitle: {
    width: "fit-content",
    fontWeight: 600,
    color: "#222",
    fontSize: "1.6875rem",
    lineHeight: "2.4375rem",
    borderBottom: "0.5px solid white",
    "&:hover": {
      borderBottom: "0.5px solid gray"
    },
    marginBottom: "20px"
  },
  upperT: {
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: ".875rem"
  },
  upperCat: {
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: ".875rem",
    marginLeft: "10px",
    color: "#F19F46",
    "&:hover": {
      color: "#5d93ff",
      cursor: "pointer"
    }
  },
  read: {
    width: "fit-content",
    fontSize: "1rem",
    color: "#5d93ff",
    margin: "20px 0",
    borderBottom: "0.5px solid #fff",
    "&:hover": {
      borderBottom: "0.5px solid #5d93ff"
    }
  },
  tag: {
    textTransform: "uppercase",
    borderColor: "#f19f46",
    color: "#f19f46",
    fontSize: "14px"
  },
  closeicon: {
    color: "#f19f46",
    "&:hover": {
      color: "#000"
    }
  }
};

class Postlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [],
      url: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.url !== this.state.url) {
      this.setState({ url: nextProps.match.url, filter: [] });
    }
  }

  render() {
    const { classes, match } = this.props;
    const { filter } = this.state;
    let list;

    switch (this.props.location.pathname) {
      case "/blog":
        list = lists.blog;
        // this.setState({ list: lists.blog });
        break;
      case "/competitiveprogramming":
        list = lists.competitiveprogramming;
        // this.setState({ list: lists.competitiveprogramming });
        break;
      case "/teachingmyselfcs":
        list = lists.teachingmyselfcs;
        // this.setState({ list: lists.teachingmyselfcs });
        break;
      case "/operatingsystems":
        list = lists.operatingsystems;
        // this.setState({ list: lists.operatingsystems });
        break;
      default:
        list = lists.errorlist;
      // this.setState({ list: lists.errorlist });
    }

    for (let tag of this.state.filter) {
      list = list.filter(ele => ele.tag.includes(tag));
    }

    return (
      <div>
        <div style={{ display: "flex", flexFlow: "row wrap" }}>
          {filter.map(ele => (
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                margin: "0 5px 15px 0"
              }}
            >
              <Chip
                label={ele}
                onDelete={() => console.log("hole")}
                color="secondary"
                classes={{
                  root: classes.tag,
                  deleteIconOutlinedColorSecondary: classes.closeicon
                }}
                variant="outlined"
              />
            </div>
          ))}
        </div>
        {list.map((element, index) => (
          <div key={index}>
            <div
              style={{
                display: "flex",
                flexFlow: "row"
              }}
            >
              <div className={classes.upperT}>
                {moment(element.date).format("MMMM YYYY")}
              </div>
              {element.tag.map(ele => (
                <div
                  key={ele.toString()}
                  className={classes.upperCat}
                  onClick={() =>
                    this.setState(state => {
                      return { filter: [...state.filter, ele] };
                    })
                  }
                >
                  {ele}
                </div>
              ))}
            </div>
            <Link
              to={`${match.url}/${element.link}`}
              style={{
                textDecoration: "none",
                marginBottom: "10px",
                width: "fit-content"
              }}
            >
              <div className={classes.postTitle}>{element.title}</div>
            </Link>
            <div>{element.description}</div>
            <Link
              style={{
                textDecoration: "none"
              }}
              to={`${match.url}/${element.link}`}
            >
              <div className={classes.read}>Read</div>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
export default withStyles(styles)(Postlist);
