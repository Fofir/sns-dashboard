import React, { Component, PropTypes } from 'react';

class JobsTable extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }

  render() {
    return (
      <div>
        [[JOBS]]
      </div>
    );
  }
}

JobsTable.propTypes = {
  fetchJobs: PropTypes.func.isRequired,
  jobs: PropTypes.array.isRequired,
};

export default JobsTable;
