import { fromJS } from 'immutable'
import { RESET_TERMINATE_ACCOUNT_STATUS, TYPE_EMAIL } from './constants'

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
    default:
      return state
  }
}

export default reducer
