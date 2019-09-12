// React stuff
import React, { Fragment } from 'react'
import PropTypes from "prop-types";
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';

// Material UI stuff
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from "@material-ui/core/Typography";
import Zoom from '@material-ui/core/Zoom';

// Icons
import LocationOn from "@material-ui/icons/LocationOnRounded";
import LinkIcon from "@material-ui/icons/LinkRounded";
import CalendarToday from "@material-ui/icons/CalendarTodayRounded";

const styles = theme => ({
  paper: {
    padding: 20,
    borderRadius: 12,
    borderColor: "text.primary"
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
        color: theme.palette.primary.main
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    }
    }
  
});

const StaticProfile = (props) => {
	const { classes, profile: { handle, createdAt, imageUrl, bio, location, website } } = props;

	return (
    <Zoom in={true}>
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
              className={classes.userHandle}
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
        </div>
      </Paper>
    </Zoom>
  );
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile);