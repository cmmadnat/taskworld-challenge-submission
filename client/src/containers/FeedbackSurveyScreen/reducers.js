import { fromJS } from 'immutable'
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
    default:
      return state
  }
}

export default reducer
