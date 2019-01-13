import { GET_TRANSFER_DATA_COMPLETE,CHECK_WORKSPACE_CONFLICT } from './constants'
export const getTransferDataComplete = data => ({
  type: GET_TRANSFER_DATA_COMPLETE,
  payload: data,
})
export const checkWorkspaceConflict = (workspace, user) => ({
  type: CHECK_WORKSPACE_CONFLICT,
  payload: {
    workspace,
    user,
  },
})
