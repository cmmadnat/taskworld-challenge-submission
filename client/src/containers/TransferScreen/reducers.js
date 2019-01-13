import { fromJS } from 'immutable'
import {
  GET_TRANSFER_DATA_COMPLETE,
  CHECK_WORKSPACE_CONFLICT_COMPLETE,
} from './constants'
import * as LoadState from '../../LoadState'

const initialState = fromJS({
  requiredTransferWorkspaces: [],
  transferOwnershipStatus: {
    workspaceId: '',
    toUserId: '',
  },
  deleteWorkspaces: [],
  loading: false,
  user: {
    _id: 'user1',
    name: 'Ross Lynch',
    email: 'ross@example.com',
  },
})
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSFER_DATA_COMPLETE:
      return state.merge(action.payload)
    case CHECK_WORKSPACE_CONFLICT_COMPLETE:
      const { workspace, user, result, errorCode } = action.payload
      if (result === 'success')
        return state.merge({
          transferOwnershipStatus: {
            workspaceId: workspace.spaceId,
            toUserId: user._id,
            ...LoadState.completed,
          },
        })
      else
        return state.merge({
          transferOwnershipStatus: {
            workspaceId: workspace.spaceId,
            toUserId: user._id,
            ...LoadState.error,
            errorCode,
          },
        })
    default:
      return state
  }
}

export default reducer
