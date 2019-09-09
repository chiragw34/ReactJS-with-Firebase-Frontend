import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeleteScream from './DeleteScream';

// Material UI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";

// Icons
import ChatIcon from "@material-ui/icons/ChatRounded";
import FavoriteIcon from "@material-ui/icons/FavoriteRounded";
import FavoriteBorder from "@material-ui/icons/FavoriteBorderRounded";

// Redux stuff
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

const styles = {
  card: {
    position:'relative',
    display: "flex",
    marginBottom: 20,
    border: 2,
    borderColor: "#fff"
  },
  image: {
    width: 170,
    height: 170
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

class Scream extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.screamId === this.props.scream.screamId
      )
    )
      return true;
    else return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
    console.log('1 likeScream',this.props.scream.likeCount)
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
    console.log('1 unlikeScream',this.props.scream.likeCount)
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: { authenticated, credentials:{handle} }
    } = this.props;

    const likeButton = !authenticated ? (
      <MyButton tip="like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedScream() ? (
      <MyButton tip="Undo like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId}/>
    ):null

    return (
      <Zoom in={true}>
        <Card className={classes.card}>
          <CardMedia
            image={userImage}
            title="Profile image"
            className={classes.image}
          />
          <CardContent className={classes.content}>
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${userHandle}`}
              color="textPrimary"
            >
              {userHandle}
            </Typography>
            {deleteButton}
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            {likeButton}
            <span>{this.props.scream.likeCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} comments</span>
          </CardContent>
        </Card>
      </Zoom>
    );
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unlikeScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
