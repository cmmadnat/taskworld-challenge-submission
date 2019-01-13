import { createSelector } from 'reselect'

const selectDefaultDomain = state => state['confirmScreenReducer'].toJS()

export const selectTerminateAccountStatus = createSelector(
  selectDefaultDomain,
  substate => substate.terminateAccountStatus
)
export const selectEmail = createSelector(
  selectDefaultDomain,
  substate => substate.email
)
