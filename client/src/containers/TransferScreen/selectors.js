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

const getTransferData = createSelector(
  selectDefaultDomain,
  substate => substate.transferData
)

const disabledNextPage = createSelector(
  requiredTransferWorkspaces,
  getTransferData,
  loading,
  transferOwnershipStatus,
  (var1, var2, var3, var4) => {
    return var2.length < var1.length || var3 || var4.status === 'error'
  }
)
// totalAssigned < totalWorkspaceRequiredTransfer ||
// loading ||
// transferOwnershipStatus.status === 'error'
export {
  selectDefaultDomain,
  transferOwnershipStatus,
  requiredTransferWorkspaces,
  deleteWorkspaces,
  loading,
  user,
  getTransferData,
  disabledNextPage,
}
