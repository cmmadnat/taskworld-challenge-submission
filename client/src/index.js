import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import './index.css'
import MockDataProvider from './MockDataProvider'
import TerminateModalFlow from './TerminateModalFlow.react'
import transferReducer from './containers/TransferScreen/reducers'

const store = createStore(combineReducers({ transferReducer }))

ReactDOM.render(
  <Provider store={store}>
    <MockDataProvider>
      {props => <TerminateModalFlow {...props} />}
    </MockDataProvider>
  </Provider>,
  document.getElementById('root')
)

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
