import { user as userSelector } from './selectors'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { CHECK_WORKSPACE_CONFLICT } from './constants'
import { checkWorkspaceConflictComplete } from './actions'
import transferOwnership from '../../services/transferOwnership'

export function* checkWorkspaceConflict(action) {
  const { workspace, user } = action.payload
  const fromUser = yield select(userSelector)
  const result = yield call(transferOwnership, fromUser, user, workspace)
  yield put(checkWorkspaceConflictComplete(result))
}

export default function*() {
  yield takeLatest(CHECK_WORKSPACE_CONFLICT, checkWorkspaceConflict)
}
