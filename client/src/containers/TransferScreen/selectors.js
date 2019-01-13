import { createSelector } from 'reselect'

const selectDefaultDomain = state => {
  return state['transferReducer'].toJS()
}

const transferOwnershipStatus = createSelector(
  selectDefaultDomain,
  substate => substate.transferOwnershipStatus
)
const requiredTransferWorkspaces = createSelector(
  selectDefaultDomain,
  substate => {
    return substate.requiredTransferWorkspaces
  }
)
const loading = createSelector(
  selectDefaultDomain,
  substate => substate.loading
)
const deleteWorkspaces = createSelector(
  selectDefaultDomain,
  substate => substate.deleteWorkspaces
)
const user = createSelector(
  selectDefaultDomain,
  substate => substate.user
)

export {
  selectDefaultDomain,
  transferOwnershipStatus,
  requiredTransferWorkspaces,
  deleteWorkspaces,
  loading,
  user,
}
