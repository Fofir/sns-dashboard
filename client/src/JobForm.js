import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';


class JobForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.addJob)}>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <Field name="message" className="form-control" component="textarea" type="text"/>
        </div>
        <div className="form-group">
          <label htmlFor="time">time</label>
          <Field name="time" className="form-control" component="input" type="text"/>
        </div>
        <div className="form-group">
          <label htmlFor="topic">Email</label>
          <Field name="topic" className="form-control" component="input" type="text"/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    )
  }
}

JobForm.propTypes = {
  addJob: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired
};

export default reduxForm({ form: 'addJob' })(JobForm);
