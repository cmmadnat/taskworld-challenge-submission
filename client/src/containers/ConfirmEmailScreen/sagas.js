import { takeLatest, select, call, put } from 'redux-saga/effects'
import _ from 'lodash'
import { DELETE_ACCOUNT } from './constants'
import {
  user as selectUser,
  getTransferData,
} from '../TransferScreen/selectors'
import { selectEmail } from './selector'
import {
  selectFeedbacks,
  selectComment,
} from '../FeedbackSurveyScreen/selectors'
import terminateAccount from '../../services/terminateAccount'
import { submitToSurveyMonkeyDeleteAccount } from '../../services/SurveyService'
import { terminateAccountError } from './actions'

function* deleteAccountSaga() {
  const email = yield select(selectEmail)
  const user = yield select(selectUser)
  if (email === user.email) {
    const transferData = yield select(getTransferData)
    const feedbacks = yield select(selectFeedbacks)
    const comment = yield select(selectComment)
    const payload = {
      transferTargets: _.map(transferData, assign => ({
        userId: assign.toUser._id,
        spaceId: assign.workspaceId,
      })),
      reason: feedbacks,
    }
    try {
      yield call(terminateAccount, payload)
    } catch (e) {
      yield put(terminateAccountError(e.message))
    }
    console.log('hello')
    const feedbackRefs = feedbacks.map(it => ({
      key: it.reason,
      value: it.comment,
    }))
    console.log('hello')
    const surveyPayload = {
      feedbackRefs,
      comment,
    }
    yield call(submitToSurveyMonkeyDeleteAccount, surveyPayload)
  } else {
    const error = 'Invalid email'
    yield put(terminateAccountError(error))
  }
}
export default function* rootSaga() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccountSaga)
}
