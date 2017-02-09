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
        <div className="row">
          <div className="col-md-12">
            <JobForm
              addJob={this.props.addJob}
              topics={this.props.topics}
              topicsLoading={this.props.topicsLoading}
              errors={this.props.formErrors}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <JobsTable 
              jobs={this.props.jobs}
              fetchJobs={this.props.fetchJobs}
              deleteJob={this.props.deleteJob}
            />
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

const mapStateToProps = state => ({
  jobs: Object.keys(state.jobs.data).map(id => state.jobs.data[id]),
  topics: state.topics.data,
  topicsLoading: state.topics.loading,
  formErrors: getFormSyncErrors('addJob')(state)
});

export default connect(mapStateToProps, actions)(App);
