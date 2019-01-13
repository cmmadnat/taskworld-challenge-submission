import { fromJS } from 'immutable'
import { SAVE_FEEDBACK, CHANGE_COMMENT } from './constants'
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
    comment: '',
    feedbacks: { ...initState },
  })
}
const initialState = initialStateFunc()
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FEEDBACK: {
      return state.merge(
        fromJS({
          feedbacks: action.payload,
        })
      )
    }
    case CHANGE_COMMENT: {
      return state.set('comment', action.payload)
    }
    default:
      return state
  }
}

export default reducer
