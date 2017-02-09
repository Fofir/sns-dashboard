import React, { Component, PropTypes } from 'react';

class JobsTable extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }

  render() {
    return (
      <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th>topic</th>
              <th>message</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {this.props.jobs.map(job =>
              <tr key={job._id}>
                <td>{job.data.topic}</td>
                <td>{job.data.message}</td>
                <td>{job.data.time}</td>
              </tr>
            )}
          </tbody>
      </table>
    );
  }
}

JobsTable.propTypes = {
  fetchJobs: PropTypes.func.isRequired,
  jobs: PropTypes.array.isRequired,
};

export default JobsTable;
