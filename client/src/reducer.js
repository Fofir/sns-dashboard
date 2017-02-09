import { combineReducers } from 'redux';
// import ActionTypes from 'constants/ActionTypes';

const actionMap = {};

const myReducer = (state = {}, action) => {

  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};

const rootReducer = combineReducers({
    myReducer
});

export default rootReducer;