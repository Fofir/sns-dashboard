import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const isValidDate = current => current.isAfter(moment().subtract(1, 'day'));

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
      invalid
    } = this.props;
    
    return (
      <form onSubmit={handleSubmit(this.props.addJob)}>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <Field
            name="message"
            className="form-control"
            component="textarea"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <Field name="time" component={TimePickerInput} />
        </div>
        <div className="form-group">
          <label htmlFor="topic">Topic</label>
          <Field
            disabled={topicsLoading}
            name="topic"
            className="form-control"
            component="select"
          >
            <option>{topicsLoading ? 'Loading...' : 'Choose a topic'}</option>
            {topics.map(({TopicArn}) => 
              <option key={TopicArn} value={TopicArn}>{TopicArn}</option>
            )}
          </Field>
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
  topics: PropTypes.array.isRequired,
  topicsLoading: PropTypes.bool.isRequired
};

export default reduxForm({ form: 'addJob' })(JobForm);
