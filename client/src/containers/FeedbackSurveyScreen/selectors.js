import { createSelector } from 'reselect'

const selectDomain = state => state.feedbackReducer.toJS()
const selectFeedbacks = createSelector(
  selectDomain,
  substate => {
    return substate.feedbacks
  }
)
export { selectFeedbacks }