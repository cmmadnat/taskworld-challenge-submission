import { fromJS } from 'immutable'
import {
  RESET_TERMINATE_ACCOUNT_STATUS,
  TYPE_EMAIL,
  TERMINATE_ACCOUNT_ERROR,
} from './constants'
import * as LoadState from '../../reference/LoadState'

const initialState = fromJS({
  email: '',
  terminateAccountStatus: {},
})
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_TERMINATE_ACCOUNT_STATUS:
      return state.set('terminateAccountStatus', fromJS({}))
    case TYPE_EMAIL:
      return state.set('email', action.payload)
    case TERMINATE_ACCOUNT_ERROR:
      const error = action.payload
      return state.set(
        'terminateAccountStatus',
        LoadState.handleLoadFailedWithError(error)({})
      )
    default:
      return state
  }
}

export default reducer
