import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getStore = () => createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

export default getStore;
