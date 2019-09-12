import React, { Fragment } from "react";
import NoImg from "../images/no-img.jpg";
import PropTypes from "prop-types";
import ThemeFile from "./theme";

// Material UI stuff
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Zoom from "@material-ui/core/Zoom";

const styles = {
  ...ThemeFile,
  card: {
    display: "flex",
    marginBottom: 20
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25
  },
  cover: {
    marginLeft:20,
    width: 170,
    height: 170,
    objectFit: "cover"
  },
  handle: {
    width: 60,
    height: 19,
    backgroundColor: '#c210e0a1',
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(189, 16, 255, 0.16)",
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: "90%",
    marginBottom: 10,
    backgroundColor: "#bd10ff63"
  },
  halfLine: {
    height: 15,
    width: "50%",
    marginBottom: 10,
    backgroundColor: "#bd10ff63"
  }
};

const ScreamSkleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Zoom in={true}>
      <Card className={classes.card} key={index}>
        <CardMedia className={classes.cover} image={NoImg} />
        <CardContent className={classes.cardContent}>
          <div className={classes.handle} />
          <div className={classes.date} />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <div className={classes.halfLine} />
        </CardContent>
      </Card>
    </Zoom>
  ));

  return (
    
      <Fragment>{content}</Fragment>
    
  );
};

ScreamSkleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreamSkleton);
