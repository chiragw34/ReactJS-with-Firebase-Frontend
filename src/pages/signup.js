import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";

// Material UI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Zoom from "@material-ui/core/Zoom";

// Redux stuff
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto",
    width: 100,
    height: 100
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 30,
    marginBottom: 10,
    position: "relative"
  },
  card: {
    padding: "20px 20px 20px 20px",
    marginTop: 50
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 20
  },
  progress: {
    position: "absolute"
  }
};

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <Zoom in={true}>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <img src={AppIcon} alt="logo" className={classes.image} />
            <Typography
              variant="h3"
              className={classes.pageTitle}
              color="textPrimary"
            >
              Sign Up
            </Typography>

            <form noValidate onSubmit={this.handleSubmit}>
              <Card className={classes.card} width={200}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange}
                  fullWidth
                />
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleChange}
                  fullWidth
                />
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  helperText={errors.confirmPassword}
                  error={errors.confirmPassword ? true : false}
                  className={classes.textField}
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  fullWidth
                />
                <TextField
                  id="handle"
                  name="handle"
                  type="text"
                  label="Handle"
                  helperText={errors.handle}
                  error={errors.handle ? true : false}
                  className={classes.textField}
                  value={this.state.handle}
                  onChange={this.handleChange}
                  fullWidth
                />
              </Card>
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Signup
                {loading && (
                  <CircularProgress
                    className={classes.progress}
                    size={25}
                    color="inherit"
                  />
                )}
              </Button>
              <br />
              <small marginTop="20">
                Already have an account? Login <Link to="/login">here</Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </Zoom>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { signupUser }
)(withStyles(styles)(signup));
