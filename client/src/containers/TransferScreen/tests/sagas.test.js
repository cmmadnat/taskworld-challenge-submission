import { checkWorkspaceConflict as sagas } from '../sagas'
import {
  checkWorkspaceConflict as action,
  checkWorkspaceConflictComplete,
} from '../actions'
import { take, call, put, select } from 'redux-saga/effects'
import { CHECK_WORKSPACE_CONFLICT } from '../constants'
import { user } from '../selectors'
import transferOwnership from '../../../services/transferOwnership'
import { runSaga } from 'redux-saga'

describe('transfer ownership sagas', () => {
  it('should yield a transfer complete action', () => {
    const actionObject = action('123', 'user4')
    const get = sagas(actionObject)
    const value = get.next({ user: 'user1' }).value
    expect(value).toEqual(select(user))

    const callValue = get.next({ user: 'user1' }).value
    // expect(callValue).toEqual(call(transferOwnership, 'user1', 'user4', '123'))

    const putValue = get.next('Conflict').value
    expect(putValue).toEqual(put(checkWorkspaceConflictComplete('Conflict')))
  })
})
