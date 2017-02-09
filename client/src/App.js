import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import * as actions from './actions';
import JobsTable from './JobsTable';

class App extends Component {
  componentDidMount() {
    this.props.fetchTopics();
  }

  render() {
    return (
      <div>
        <JobsTable 
          jobs={this.props.jobs}
          fetchJobs={this.props.fetchJobs}
        />
      </div>
    );
  }
}

App.propTypes = {
  fetchTopics: PropTypes.func.isRequired,
  fetchJobs: PropTypes.func.isRequired,
  jobs: PropTypes.array.isRequired,
  topics: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  jobs: Object.keys(state.jobs.data).map(id => state.jobs.data[id]),
  topics: state.topics.data
});

export default connect(mapStateToProps, actions)(App);
