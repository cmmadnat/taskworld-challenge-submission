import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Route, Link } from 'react-router-dom'
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router'
import { createBrowserHistory } from 'history'

import createSagaMiddleware from 'redux-saga'

import './index.css'
import transferReducer from './containers/TransferScreen/reducers'
import feedbackReducer from './containers/FeedbackSurveyScreen/reducers'
import confirmScreenReducer from './containers/ConfirmEmailScreen/reducers'

import TransferScreen from './containers/TransferScreen/index'
import FeedbackSurveyScreen from './containers/FeedbackSurveyScreen/index'
import ConfirmEmailScreen from './containers/ConfirmEmailScreen/index'
import { getTransferData } from './actions'
import rootSaga from './sagas'
import transferScreenSaga from './containers/TransferScreen/sagas'
import confirmEmailScreenSaga from './containers/ConfirmEmailScreen/sagas'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const history = createBrowserHistory()

const store = createStore(
  createReducers(history),
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
)

sagaMiddleware.run(rootSaga)
sagaMiddleware.run(transferScreenSaga)
sagaMiddleware.run(confirmEmailScreenSaga)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route
          path="/"
          exact
          render={() => {
            store.dispatch(getTransferData())
            return <TransferScreen />
          }}
        />
        <Route path="/feedback/" component={FeedbackSurveyScreen} />
        <Route path="/terminate/" component={ConfirmEmailScreen} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
function createReducers(history) {
  return combineReducers({
    transferReducer,
    feedbackReducer,
    confirmScreenReducer,
    router: connectRouter(history),
  })
}
