import {
  RESET_TERMINATE_ACCOUNT_STATUS,
  TYPE_EMAIL,
  DELETE_ACCOUNT,
} from './constants'
export const resetTerminateAccountStatus = () => ({
  type: RESET_TERMINATE_ACCOUNT_STATUS,
})
export const typeEmail = email => ({
  type: TYPE_EMAIL,
  payload: email,
})
export const deleteAccount = () => ({
  type: DELETE_ACCOUNT,
})
