import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducer';

const composeEnhancers = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const finalCreateStore = composeEnhancers()(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer');
      store.replaceReducer(nextRootReducer);
    })
  }

  return store;
};
