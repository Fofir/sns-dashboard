import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import * as actions from './actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchTopics();
  }

  render() {
    return (
      <div>
      APP HERE
      </div>
    );
  }
}

App.propTypes = {
  fetchTopics: PropTypes.func.isRequired,
  jobs: PropTypes.array.isRequired,
  topics: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs.data,
  topics: state.topics.data
});

export default connect(mapStateToProps, actions)(App);
