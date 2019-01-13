import { fromJS } from 'immutable'
import { GET_TRANSFER_DATA_COMPLETE } from './constants'

const initialState = fromJS({
  requiredTransferWorkspaces: [],
  transferOwnershipStatus: {},
  deleteWorkspaces: [],
  loading: false,
  user: {},
})
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSFER_DATA_COMPLETE:
      return state.merge(action.payload)
    default:
      return state
  }
}

export default reducer
