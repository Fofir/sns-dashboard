import { polyfill } from 'es6-promise';
import 'isomorphic-fetch';
polyfill();

import actionTypes from '../constants/actionTypes';

export const fetchTopics = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.TOPICS_FETCH_REQUEST });

  fetch('/api/topics')
    .then(res => res.json())
    .then(({ Topics }) => dispatch({
      type: actionTypes.TOPICS_FETCH_SUCCESS,
      payload: Topics
    }))
    .catch(err => dispatch({ type: actionTypes.TOPICS_FETCH_FAILURE }))
}

export const fetchJobs = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.JOBS_FETCH_REQUEST });

  fetch('/api/jobs')
    .then(res => res.json())
    .then(jobs => dispatch({
      type: actionTypes.JOBS_FETCH_SUCCESS,
      payload: jobs
    }))
    .catch(err => dispatch({ type: actionTypes.JOBS_FETCH_FAILURE }))
}