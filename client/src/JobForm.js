import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Datetime from 'react-datetime';
import { validators, isValidDate } from './utils/helpers';
import 'react-datetime/css/react-datetime.css';

const TimePickerInput = props => (
  <Datetime isValidDate={isValidDate} {...props.input} />
);

class JobForm extends Component {
  render() {
    const {
      handleSubmit,
      topics,
      topicsLoading,
      pristine,
      invalid,
      errors,
      addJob
    } = this.props;

    return (
      <form onSubmit={handleSubmit(addJob)}>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <Field
            name="message"
            className="form-control"
            component="textarea"
            type="text"
            validate={validators.required}
          />
          {!pristine && errors.message && <span className="help-block">{errors.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <Field name="time" component={TimePickerInput} validate={validators.required} />
          {!pristine && errors.time && <span className="help-block">{errors.time}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="topic">Topic</label>
          <Field
            disabled={topicsLoading}
            name="topic"
            className="form-control"
            component="select"
            validate={validators.required}
          >
            <option>{topicsLoading ? 'Loading...' : 'Choose a topic'}</option>
            {topics.map(({TopicArn}) => 
              <option key={TopicArn} value={TopicArn}>{TopicArn}</option>
            )}
          </Field>
          {!pristine && errors.topic && <span className="help-block">{errors.topic}</span>}
        </div>
        <button
          disabled={pristine || invalid}
          type="submit"
          className="btn btn-default"
        >
          Submit
        </button>
      </form>
    )
  }
}

JobForm.propTypes = {
  addJob: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  topics: PropTypes.array.isRequired,
  topicsLoading: PropTypes.bool.isRequired
};

export default reduxForm({ form: 'addJob' })(JobForm);
