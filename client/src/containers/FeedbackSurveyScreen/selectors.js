import { createSelector } from 'reselect'

const selectDomain = state => state['feedbackReducer'].toJS()
const showCommentForm = state => true

const selectFeedbacks = createSelector(
  selectDomain,
  substate => {
    return substate.feedbacks
  }
)
const selectComment = createSelector(
  selectDomain,
  substate => substate.comment
)
const selectCommentForName = createSelector(
  selectDomain,
  substate => substate.commentForName
)
export { selectFeedbacks, showCommentForm, selectComment, selectCommentForName }
