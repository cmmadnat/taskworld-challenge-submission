import { createSelector } from 'reselect'

const selectDefaultDomain = state => state['transferReducer']

const transferOwnershipStatus = createSelector(
  selectDefaultDomain,
  substate => substate.get('transferOwnershipStatus')
)
const requiredTransferWorkspaces = createSelector(
  selectDefaultDomain,
  substate => substate.get('requiredTransferWorkspaces')
)
const loading = createSelector(selectDefaultDomain, substate =>
  substate.get('loading')
)
const deleteWorkspaces = createSelector(
  selectDefaultDomain,
  substate => substate.get('deleteWorkspaces')
)
const user = createSelector(
  selectDefaultDomain,
  substate => substate.get('user')
  )


export {
  selectDefaultDomain,
  transferOwnershipStatus,
  requiredTransferWorkspaces,
  deleteWorkspaces,
  loading,
  user,
}
