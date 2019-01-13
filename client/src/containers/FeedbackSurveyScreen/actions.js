import {
  SAVE_FEEDBACK,
  CHANGE_COMMENT,
  CHANGE_COMMENT_FOR_NAME,
} from './constants'

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

export const changeCommentForName = (name, comment) => {
  return {
    type: CHANGE_COMMENT_FOR_NAME,
    payload: { name, comment },
  }
}
