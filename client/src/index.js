import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'

import './index.css'
import MockDataProvider from './MockDataProvider'
import TerminateModalFlow from './TerminateModalFlow.react'
import transferReducer from './containers/TransferScreen/reducers'

import TransferScreen from './containers/TransferScreen/index'
import FeedbackSurveyScreen from './containers/FeedbackSurveyScreen/index'
import ConfirmEmailScreen from './containers/ConfirmEmailScreen/index'
import { getTransferData } from './actions'
import rootSaga from './sagas'
import transferScreenSaga from './containers/TransferScreen/sagas'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({ transferReducer }),
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)
sagaMiddleware.run(transferScreenSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router>
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
    </Router>
    {/* <MockDataProvider>
      {props => <TerminateModalFlow {...props} />}
    </MockDataProvider> */}
  </Provider>,
  document.getElementById('root')
)

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
