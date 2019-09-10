import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

// Material UI stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import Zoom from "@material-ui/core/Zoom";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff
import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";

// Icons
import EditIcon from "@material-ui/icons/EditRounded";
import AddIcon from "@material-ui/icons/AddRounded";
import CloseIcon from "@material-ui/icons/CloseRounded";
import { DialogContentText } from "@material-ui/core";

const styles = theme => ({
  palette: {
    common: {
      black: "#000000",
      white: "#ffffff"
    },
    background: {
      paper: "#27002f",
      default: "#000000"
    },
    primary: {
      light: "#cf70ff",
      main: "#bd10e0",
      dark: "#9013fe",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#cf70ff",
      main: "#bd10e0",
      dark: "#9013fe",
      contrastText: "#ffffff"
    },
    error: {
      light: "#e57373",
      main: "#ff0000",
      dark: "#d32f2f",
      contrastText: "#ffffff"
    },
    text: {
      primary: "#ffffff",
      secondary: "#bd10e0",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "#7ed321"
    }
  },
  submitButton: {
    position: "relative"
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "5%",
    color: "#bd10e0"
  },
  MuiFormHelperTextroot: {
    color:"#d32f2f"
  }
});

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, errors:{} });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.postScream({ body: this.state.body });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' });
      this.handleClose();
    }
  }

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a scream">
          <AddIcon fontSize="large" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Scream"
                multiline
                rows="3"
                placeholder="Scream your problems here"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postScream }
)(withStyles(styles)(PostScream));
