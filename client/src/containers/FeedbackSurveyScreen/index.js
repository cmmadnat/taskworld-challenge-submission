import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { selectFeedbacks } from './selectors'
import { saveFeedback } from './actions'
import { push, goBack } from 'connected-react-router'

import { feedbackSurveyItems } from './FeedbackSurveyItems'
import { createStructuredSelector } from 'reselect'

class FeedbackSurveyModal extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    onBackButton: PropTypes.func,
    title: PropTypes.node,
    showCommentForm: PropTypes.bool,
    comment: PropTypes.string,
    onChangeComment: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      isFocusCommentBox: false,
      ...this.props.feedbacks,
    }
    this.renderButtons = this.renderButtons.bind(this)
  }

  hasAllUnchecked = () => {
    const FeedbackSurveyItems = this.state
    return (
      _.every(FeedbackSurveyItems, val => val === false) &&
      !this.state.isFocusCommentBox
    )
  }

  onToggleFeedback(stack) {
    this.setState({ [stack]: !this.state[stack] })
  }

  onFocusCommentBox = () => {
    this.setState({ isFocusCommentBox: !this.state.isFocusCommentBox })
  }

  renderInputForm({ stack, canComment, placeHolder }) {
    const prefill = placeHolder && canComment ? placeHolder : ''
    return !this.state[stack] ? null : (
      <div style={!canComment ? { display: 'none' } : null}>
        <input type="text" name={stack} ref={stack} placeholder={prefill} />
      </div>
    )
  }

  renderButtons() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.goBack()
            this.props.onSubmit(this.state)
          }}
        >
          Back
        </button>
        <button
          onClick={() => this.props.onSubmit(this.state)}
          disabled={this.hasAllUnchecked()}
        >
          Next
        </button>
      </div>
    )
  }

  renderCommentForm() {
    if (!this.props.showCommentForm) return
    return (
      <div style={{ marginTop: '2rem' }}>
        Comments:
        <div>
          <textarea
            type="text"
            name="comment"
            style={
              this.state.isFocusCommentBox
                ? { border: '1px solid blue' }
                : { border: '1px solid black' }
            }
            onChange={this.props.onChangeComment}
            value={this.props.comment}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>
          {_.map(feedbackSurveyItems, (item, key) => (
            <div key={key}>
              <label>
                <input
                  type="checkbox"
                  checked={this.state[item.stack]}
                  onChange={() => this.onToggleFeedback(item.stack)}
                />
                {item.title}
              </label>
              {this.renderInputForm(item)}
            </div>
          ))}
        </div>
        {this.renderCommentForm()}
        {this.renderButtons()}
      </div>
    )
  }
}

export default connect(
  () => {
    const fromSelectors = createStructuredSelector({
      feedbacks: selectFeedbacks,
    })
    return { ...fromSelectors, showCommentForm: true }
  },
  dispatch => ({
    onSubmit: values => {
      delete values.isFocusCommentBox
      dispatch(saveFeedback(values))
      dispatch(push('/terminate'))
    },
    goBack: () => {
      dispatch(goBack())
      dispatch(saveFeedback(values))
    },
  })
)(FeedbackSurveyModal)
