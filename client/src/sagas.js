import { takeLatest, put } from 'redux-saga'
import { GET_TRANSFER_DATA } from './constants'
import { getTransferDataComplete } from './actions'
function* getTransferData() {
  console.log('get transfer data')
  yield put(getTransferDataComplete({ hello: 'world' }))
}

function* rootSaga() {
  takeLatest(GET_TRANSFER_DATA, getTransferData)
}
