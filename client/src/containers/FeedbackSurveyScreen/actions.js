import { SAVE_FEEDBACK, CHANGE_COMMENT } from './constants'

export const changeComment = comment => {
  return {
    type: CHANGE_COMMENT,
    payload: comment,
  }
}
export const saveFeedback = feedback => {
  return {
    type: SAVE_FEEDBACK,
    payload: feedback,
  }
}
