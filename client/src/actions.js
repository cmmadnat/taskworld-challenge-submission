import { GET_TRANSFER_DATA, GET_TRANSFER_DATA_COMPLETE } from './constants'

export const getTransferData = () => ({ type: GET_TRANSFER_DATA })
export const getTransferDataComplete = data => ({
  type: GET_TRANSFER_DATA_COMPLETE,
  payload: data,
})
