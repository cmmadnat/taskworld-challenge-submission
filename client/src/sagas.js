import { takeLatest, put ,call} from 'redux-saga/effects'
import { GET_TRANSFER_DATA } from './constants'
import { getTransferDataComplete } from './containers/TransferScreen/actions'
import service from './services/fetchRelatedSpace'
const user = {
  _id: 'user1',
  name: 'Ross Lynch',
  email: 'ross@example.com',
}
function* getTransferData() {
  const data = yield call(service, user._id)
  yield put(getTransferDataComplete(data))
}

export default function* rootSaga() {
  yield takeLatest(GET_TRANSFER_DATA, getTransferData)
}
