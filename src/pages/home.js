import React, { Component } from "react";
import PropTypes from "prop-types";

// Material UI stuff
import Grid from "@material-ui/core/Grid";

// Components
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import ScreamSkleton from "../util/ScreamSkleton";


// Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkleton />
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={3} xs={12} >
          <Profile />
        </Grid>
        <Grid item sm={9} xs={12} >
          {recentScreamsMarkup}
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getScreams }
)(home);
