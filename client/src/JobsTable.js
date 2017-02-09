import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class JobsTable extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }

  render() {
    const { deleteJob, jobs } = this.props;
    return (
      <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th>topic</th>
              <th>subscriptions</th>
              <th>message</th>
              <th>time</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {jobs.map(job =>
              <tr key={job.id}>
                <td>{job.topic.name}</td>
                <td>{job.topic.subscriptions}</td>
                <td>{job.message}</td>
                <td>{moment(job.time).format('lll')}</td>
                <td>
                  <button
                    onClick={() => deleteJob(job._id)}
                    className="btn btn-xs btn-danger"
                  >
                    delete job
                  </button>
                </td>
              </tr>
            )}
          </tbody>
      </table>
    );
  }
}

JobsTable.propTypes = {
  fetchJobs: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  jobs: PropTypes.array.isRequired,
};

export default JobsTable;
