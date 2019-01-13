import { takeLatest } from 'redux-saga/effects'
import { DELETE_ACCOUNT } from './constants'

function* deleteAccountSaga() {}
export default function* rootSaga() {
  takeLatest(DELETE_ACCOUNT, deleteAccountSaga)
}
