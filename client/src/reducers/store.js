import { applyMiddleware, createStore, combineReducers } from 'redux';
import { entitiesReducer, queriesReducer, queryMiddleware } from 'redux-query';
import superagentInterface from 'redux-query-interface-superagent';
import thunk from 'redux-thunk';
import featuresReducer from './features'
import boundariesReducer from './boundaries'
import { CLEAR_STORE } from '../actions/clearStore';

export const getQueries = (state) => state.queries;
export const getEntities = (state) => state.entities;

const reducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer,
  features: featuresReducer,
  boundaries: boundariesReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    return reducer(undefined, action)
  };
  return reducer(state, action);
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, queryMiddleware(superagentInterface, getQueries, getEntities)),
);

export default store;
