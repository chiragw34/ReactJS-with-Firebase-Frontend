import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NoImg from "../images/no-img.jpg";
import ThemeFile from "./theme";

// Material UI stuff
import Paper from "@material-ui/core/Paper";
import Zoom from '@material-ui/core/Zoom';

// Icons
import LocationOn from "@material-ui/icons/LocationOnRounded";
import LinkIcon from "@material-ui/icons/LinkRounded";
import CalendarToday from "@material-ui/icons/CalendarTodayRounded";

const styles = {
  ...ThemeFile,
  paper: {
    padding: 20,
    borderRadius: 12
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative"
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: ThemeFile.palette.primary.main
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  },
  handle: {
    height: 20,
    backgroundColor: "#c210e0a1",
    width: 60,
    margin: "0px auto 7px auto"
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(189, 16, 255, 0.16)",
    width: "100%",
    marginBottom: 10
  },
	halfLine: {
    height: 15,
    width: "50%",
    marginBottom: 10,
    backgroundColor: "#bd10ff63"
  }
};

const ProfileSkleton = props => {
  const { classes } = props;
	return (
    <Zoom in={true}>
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={NoImg} alt="profile" className="profile-image" />
          </div>
          <hr />
          <div className="profile-details">
            <div className={classes.handle} />
            <hr />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <hr />
            <LocationOn color="primary" /> <span>Location</span>
            <hr />
            <LinkIcon color="primary" />
            <span>https://website.com</span>
            <hr />
            <CalendarToday color="primary" /> <span>Joined date</span>
          </div>
        </div>
      </Paper>
    </Zoom>
  );
};

ProfileSkleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkleton);
