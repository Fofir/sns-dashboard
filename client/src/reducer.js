import { combineReducers } from 'redux';
import actionTypes from './constants/actionTypes';

const mapById = (arr = []) => {
  return arr.reduce((curr, item) => {
    return { ...curr, [item._id]: item };
  }, {});
}

const topicsActionMap = {
  [actionTypes.TOPICS_FETCH_REQUEST]: (state, action) => {
    return {
      ...state,
      loading: true
    };
  },
  [actionTypes.TOPICS_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      data: action.payload
    };
  },
  [actionTypes.TOPICS_FETCH_FAILURE]: (state, action) => {
    return { ...state, loading: false };
  }
};

const jobsActionMap = {
  [actionTypes.JOBS_FETCH_REQUEST]: (state, action) => {
    return {
      ...state,
      loading: true
    };
  },
  [actionTypes.JOBS_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      data: mapById(action.payload)
    };
  },
  [actionTypes.JOBS_FETCH_FAILURE]: (state, action) => {
    return { ...state, loading: false };
  },
  [actionTypes.JOB_DELETE_REQUEST]: (state, action) => state,
  [actionTypes.JOB_DELETE_SUCCESS]: (state, action) => {
    const newState = { ...state };
    delete newState.data[action.payload];
    return newState
  },
  // [actionTypes.JOB_DELETE_FAILURE]: (state, action) => state,
  [actionTypes.JOB_ADD_REQUEST]: (state, action) => state,
  [actionTypes.JOB_ADD_SUCCESS]: (state, action) => state,
  [actionTypes.JOB_ADD_FAILURE]: (state, action) => state
};

const jobs = (state = { loading: false, data: {} }, action) => {
  if (jobsActionMap[action.type]) {
    return jobsActionMap[action.type](state, action);
  }

  return state;
};

const topics = (state = { loading: false, data: [] }, action) => {
  if (topicsActionMap[action.type]) {
    return topicsActionMap[action.type](state, action);
  }

  return state; 
}

const rootReducer = combineReducers({
    jobs,
    topics
});

export default rootReducer;