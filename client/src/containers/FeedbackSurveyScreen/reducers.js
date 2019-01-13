import { fromJS } from 'immutable'
import { SAVE_FEEDBACK } from './constants'
import * as feedbackSurveyItems from './FeedbackSurveyItems'
import _ from 'lodash'

const initialStateFunc = () => {
  const feedbacks = feedbackSurveyItems.feedbackSurveyItems
  const feedbackText = feedbacks.map(it => it.reason)
  const initState = _.chain(feedbackSurveyItems.feedbackSurveyItems)
    .map(item => {
      return [item.stack, _.includes(feedbackText, item.stack)]
    })
    .fromPairs()
    .value()
  return fromJS({
    feedbacks: { ...initState },
  })
}
const initialState = initialStateFunc()
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FEEDBACK: {
      console.log('saveing feedback')
      return state.merge(
        fromJS({
          feedbacks: action.payload,
        })
      )
    }
    default:
      return state
  }
}

export default reducer
