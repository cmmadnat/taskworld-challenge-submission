import { SAVE_FEEDBACK } from './constants'

export const saveFeedback = feedback => {
  return {
    type: SAVE_FEEDBACK,
    payload: feedback,
  }
}
