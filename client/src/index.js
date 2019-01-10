import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './index.css'
import MockDataProvider from './MockDataProvider'
import TerminateModalFlow from './TerminateModalFlow.react'
import transferReducer from './containers/TransferScreen/reducers'

import TransferScreen from './containers/TransferScreen/index'
import FeedbackSurveyScreen from './containers/FeedbackSurveyScreen/index'
import ConfirmEmailScreen from './containers/ConfirmEmailScreen/index'

const store = createStore(combineReducers({ transferReducer }))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" exact component={TransferScreen} />
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
