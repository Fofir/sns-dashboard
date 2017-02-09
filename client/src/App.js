import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import * as actions from './actions';
import { getFormSyncErrors } from 'redux-form';
import JobsTable from './JobsTable';
import JobForm from './JobForm';

class App extends Component {
  componentDidMount() {
    this.props.fetchTopics();
  }

  render() {
    return (
      <div className="container">
        <div class="page-header">
          <h1>Amazon SNS dashboard</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Create a new job!</h3>
              </div>
              <div className="panel-body">
                <JobForm
                  addJob={this.props.addJob}
                  topics={this.props.topics}
                  topicsLoading={this.props.topicsLoading}
                  errors={this.props.formErrors}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h2>Jobs</h2>
            {this.props.topicsLoading
              ? <span>Loading...</span>
              : <JobsTable 
                  jobs={this.props.jobs}
                  fetchJobs={this.props.fetchJobs}
                  deleteJob={this.props.deleteJob}
                />
            }
          </div>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  formErrors: {}
};

App.propTypes = {
  fetchTopics: PropTypes.func.isRequired,
  fetchJobs: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  jobs: PropTypes.array.isRequired,
  topics: PropTypes.array.isRequired,
  topicsLoading: PropTypes.bool.isRequired,
  formErrors: PropTypes.object.isRequired
};

const jobsSelector = state => {
  const {
    jobs: { data: jobs },
    topics: { data: topics }
  } = state;

  return Object.keys(jobs).map(id => {
    const job = jobs[id];
    const topicData = topics[job.data.topic];

    return { id, ...job.data, topic: topicData || {}}
  })
}

const mapStateToProps = state => ({
  jobs: jobsSelector(state),
  topics: Object.keys(state.topics.data).map(id => state.topics.data[id]),
  topicsLoading: state.topics.loading,
  formErrors: getFormSyncErrors('addJob')(state)
});

export default connect(mapStateToProps, actions)(App);
