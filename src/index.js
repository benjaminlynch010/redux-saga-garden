import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import App from './App';

const plantData = (state = [], action) => {
  switch(action.type) {
    case 'ADD_PLANT_DATA':
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}

function* fetchPlants(action) {
  const array = yield axios.get('/api/plant')
  yield put({ type: 'ADD_PLANT_DATA', payload: array.data })
}

function* rootSaga() {
  yield takeLatest('GET_PLANTS', fetchPlants)
}

const SagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({ plantData }),
  applyMiddleware( SagaMiddleware, logger )
);

SagaMiddleware.run(rootSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
