import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddlware from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducers from '../reducers';


const middlewares = [
  promiseMiddlware()
]

if(__DEV__){
  middlewares.push(logger)
}

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducers,
    undefined,
    enhancers(applyMiddleware(...middlewares))
);

export default store;