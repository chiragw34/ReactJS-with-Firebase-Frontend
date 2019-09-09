import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      console.log('SET_SCREAM:', action.payload);
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams[index] = action.payload;
      console.log('LIKE_UNLIKE_SCREAM:', action.payload.likeCount)
      return {
        ...state
      };
    default:
      return state;
  }
}
