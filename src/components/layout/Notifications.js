import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

// Material UI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Zoom from "@material-ui/core/Zoom";

// Icons
import Notification from "@material-ui/icons/NotificationsRounded";
import Favorite from "@material-ui/icons/FavoriteRounded";
import Chat from "@material-ui/icons/ChatRounded";

// Redux stuff
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

class Notifications extends Component {
  state = {
    anchorEl: null
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpened = () => {
    let unReadNotificationIds = this.props.notifications
      .filter(notfn => !notfn.read)
			.map(notfn => notfn.notificationId);
		
    this.props.markNotificationsRead(unReadNotificationIds);
  };

  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(notfn => notfn.read === false).length > 0
        ? (notificationIcon = (
            <Badge
              badgeContent={
                notifications.filter(notfn => notfn.read === false).length
              }
              color="error"
            >
              <Notification fontSize="large" />
            </Badge>
          ))
        : (notificationIcon = <Notification fontSize="large"/>);
    } else {
      notificationIcon = <Notification fontSize="large" />;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map(notfn => {
          const verb = notfn.type === "like" ? "liked" : "commented on";
          const time = dayjs(notfn.createdAt).fromNow();
          const iconColor = notfn.read ? "secondary" : "primary";
          const icon =
            notfn.type === "like" ? (
              <Favorite color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <Chat color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem
              key={notfn.createdAt}
              onClick={this.handleClose}
              style={{ background: "#110013"}}
            >
              {icon}
              <Typography
                component={Link}
                color={iconColor}
                variant="body1"
                to={`/users/${notfn.recipient}/scream/${notfn.screamId}`}
              >
                {notfn.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem
          onClick={this.handleClose}
          style={{ background: "#110013"}}
        >
          <p class="loading">You have no notifications yet</p>
        </MenuItem>
      );

    return (
      <Fragment>
        <Tooltip placement="bottom" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
          TransitionComponent={Zoom}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propType = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  notifications: state.user.notifications
});

export default connect(
  mapStateToProps,
  { markNotificationsRead }
)(Notifications);
