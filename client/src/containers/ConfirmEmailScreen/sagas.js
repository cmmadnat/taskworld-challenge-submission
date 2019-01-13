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
  selectCommentForName,
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
      const commentForName = yield select(selectCommentForName)
      const feedbackRefs = Object.keys(feedbacks)
        .filter(it => feedbacks[it])
        .map(it => {
          const filterList = commentForName.filter(it2 => it === it2.name)
          return {
            key: it,
            value: filterList.length != 0 ? filterList[0].comment : '',
          }
        })
      const surveyPayload = {
        feedbackRefs,
        comment,
      }
      yield call(submitToSurveyMonkeyDeleteAccount, surveyPayload)
      window.location = 'http://www.example.com/'
    } catch (e) {
      yield put(terminateAccountError(e.message))
    }
  } else {
    const error = 'Invalid email'
    yield put(terminateAccountError(error))
  }
}
export default function* rootSaga() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccountSaga)
}
