import { fromJS } from 'immutable'
import {
  GET_TRANSFER_DATA_COMPLETE,
  CHECK_WORKSPACE_CONFLICT_COMPLETE,
} from './constants'
import * as LoadState from '../../LoadState'
import _ from 'lodash'

const initialState = fromJS({
  requiredTransferWorkspaces: [],
  transferOwnershipStatus: {
    workspaceId: '',
    toUserId: '',
  },
  deleteWorkspaces: [],
  transferData: [],
  loading: false,
  user: {
    _id: 'user1',
    name: 'Ross Lynch',
    email: 'ross@example.com',
  },
})
const getTransferData = state => {
  const { workspaceId, toUserId, status } = state
    .get('transferOwnershipStatus')
    .toJS()
  const transferData = state.get('transferData').toJS()
  const updateData = _.reduce(
    transferData,
    (result, assign) => {
      if (
        assign.workspaceId === workspaceId &&
        assign.toUser._id === toUserId
      ) {
        result.push(Object.assign({}, assign, { status }))
      } else {
        result.push(assign)
      }
      return result
    },
    []
  )
  return updateData
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSFER_DATA_COMPLETE:
      return state.merge(action.payload)
    case CHECK_WORKSPACE_CONFLICT_COMPLETE:
      const { workspace, user, result, errorCode } = action.payload
      if (result === 'success') {
        const assigns = _.reject(
          getTransferData(state),
          assign => assign.workspaceId === workspace.spaceId
        )
        return state
          .merge(
            fromJS({
              transferOwnershipStatus: {
                workspaceId: workspace.spaceId,
                toUserId: user._id,
                ...LoadState.completed,
              },
            })
          )
          .merge(
            fromJS({
              transferData: [
                ...assigns,
                {
                  workspaceId: workspace.spaceId,
                  toUser: user,
                  ...LoadState.pending,
                },
              ],
            })
          )
      } else
        return state.merge(
          fromJS({
            transferOwnershipStatus: {
              workspaceId: workspace.spaceId,
              toUserId: user._id,
              ...LoadState.error,
              errorCode,
            },
          })
        )

    default:
      return state
  }
}

export default reducer
