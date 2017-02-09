import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import actionTypes from './constants/actionTypes';
import { mapByField } from './utils/helpers';

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
      data: mapByField(action.payload, 'topicArn')
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
      data: mapByField(action.payload)
    };
  },
  [actionTypes.JOBS_FETCH_FAILURE]: (state, action) => {
    return { ...state, loading: false };
  },
  [actionTypes.JOB_DELETE_SUCCESS]: (state, action) => {
    const newState = { ...state };
    delete newState.data[action.payload];
    return newState
  },
  [actionTypes.JOB_ADD_SUCCESS]: (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        [action.payload._id]: action.payload
      }
    }
  }
};

const jobs = (state = { loading: false, data: {} }, action) => {
  if (jobsActionMap[action.type]) {
    return jobsActionMap[action.type](state, action);
  }

  return state;
};

const topics = (state = { loading: false, data: {} }, action) => {
  if (topicsActionMap[action.type]) {
    return topicsActionMap[action.type](state, action);
  }

  return state; 
}

const rootReducer = combineReducers({
    jobs,
    topics,
    form: formReducer
});

export default rootReducer;