import { SAVE_FEEDBACK } from './constants'

export const saveFeedback = feedback => ({
  type: SAVE_FEEDBACK,
  action: feedback,
})
