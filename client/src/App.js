import React, { Component } from 'react';
import {connect} from 'react-redux'

class App extends Component {
  render() {
    return (
      <div>
      APP HERE
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
