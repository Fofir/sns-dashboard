import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store'
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class Root extends Component {
  render () {
    const store = configureStore();

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render( <Root />, document.getElementById('root'));