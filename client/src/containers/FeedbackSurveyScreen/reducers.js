import { fromJS } from 'immutable'
import {
  SAVE_FEEDBACK,
  CHANGE_COMMENT,
  CHANGE_COMMENT_FOR_NAME,
} from './constants'
import * as feedbackSurveyItems from './FeedbackSurveyItems'
import _ from 'lodash'
import { changeCommentForName } from './actions'

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
    commentForName: [],
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
    case CHANGE_COMMENT_FOR_NAME: {
      const { name, comment } = action.payload
      let commentForName = state
        .get('commentForName')
        .toJS()
        .map(it => {
          if (it.name === name) it.comment = comment
          it
        })
        .filter(it => it.comment.length != 0)
      if (commentForName.length == 0) commentForName.push({ name, comment })
      return state.set('commentForName', fromJS(commentForName))
    }
    default:
      return state
  }
}

export default reducer
