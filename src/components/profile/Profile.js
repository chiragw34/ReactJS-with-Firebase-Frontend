import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import MyButton from "../../util/MyButton";
import ProfileSkleton from "../../util/ProfileSkleton";
import ThemeFile from '../../util/theme';

// Redux stuff
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

// Material UI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";

// Icons
import LocationOn from "@material-ui/icons/LocationOnRounded";
import LinkIcon from "@material-ui/icons/LinkRounded";
import CalendarToday from "@material-ui/icons/CalendarTodayRounded";
import EditIcon from "@material-ui/icons/EditRounded";
import PowerSettingsNewRoundedIcon from "@material-ui/icons/PowerSettingsNewRounded";

const styles = {
  ...ThemeFile,
  paper: {
    padding: 20,
    borderRadius: 12,
    borderColor: "text.primary"
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
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

  logoutButton: {
    left: "85%",
    right: "10%",
    top: "10%"
  },
  userHandle: {
    textDecoration: "none"
  }
};

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Zoom in={true}>
          <Paper className={classes.paper}>
            <MyButton
              tip="Logout"
              onClick={this.handleLogout}
              btnClassName={classes.logoutButton}
            >
              <PowerSettingsNewRoundedIcon color="primary" />
            </MyButton>
            <div className={classes.profile}>
              <div className="image-wrapper">
                <img src={imageUrl} alt="profile" className="profile-image" />
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                <MyButton
                  tip="Edit profile picture"
                  onClick={this.handleEditPicture}
                  btnClassName="button"
                >
                  <EditIcon color="primary" />
                </MyButton>
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
              <EditDetails />
            </div>
          </Paper>
        </Zoom>
      ) : (
        <Zoom in={true}>
          <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
              No profile found, please login again
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Paper>
        </Zoom>
      )
    ) : (
      <ProfileSkleton />
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Profile));
