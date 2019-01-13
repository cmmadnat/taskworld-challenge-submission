import {GET_TRANSFER_DATA_COMPLETE} from './constants'
export const getTransferDataComplete = data => ({
  type: GET_TRANSFER_DATA_COMPLETE,
  payload: data,
})