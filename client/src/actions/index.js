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
};

export const fetchJobs = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.JOBS_FETCH_REQUEST });

  fetch('/api/jobs')
    .then(res => res.json())
    .then(jobs => dispatch({
      type: actionTypes.JOBS_FETCH_SUCCESS,
      payload: jobs
    }))
    .catch(err => dispatch({ type: actionTypes.JOBS_FETCH_FAILURE }))
};

export const addJob = data => (dispatch, getState) => {
  dispatch({ type: actionTypes.JOB_ADD_REQUEST });
  const body = JSON.stringify(data);
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    body,
    method: 'POST'
  };

  fetch('/api/jobs/', options)
    .then(res => res.json())
    .then(job => dispatch({
      type: actionTypes.JOB_ADD_SUCCESS,
      payload: job
    }))
    .catch(err => dispatch({ type: actionTypes.JOB_ADD_FAILURE }));
};

export const deleteJob = jobId => (dispatch, getState) => {
  dispatch({ type: actionTypes.JOB_DELETE_REQUEST });

  fetch(`/api/jobs/${jobId}`, { method: 'DELETE' })
    .then(res => dispatch({ type: actionTypes.JOB_DELETE_SUCCESS, payload: jobId }))
    .catch(err => dispatch({ type: actionTypes.JOB_DELETE_FAILURE }))
};
