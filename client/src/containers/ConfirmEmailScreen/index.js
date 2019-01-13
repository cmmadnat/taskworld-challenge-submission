import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectTerminateAccountStatus, selectEmail } from './selector'
import { user, disabledNextPage } from '../TransferScreen/selectors'
import {
  resetTerminateAccountStatus,
  typeEmail,
  deleteAccount,
} from './actions'

import { isLoading } from '../../reference/LoadState'
import { goBack } from 'connected-react-router'

class ConfirmEmailModal extends React.PureComponent {
  static propTypes = {
    onClickToDelete: PropTypes.func,
    onBackButton: PropTypes.func,
    email: PropTypes.string,
    onTypeEmail: PropTypes.func,
    resetTerminateAccountStatus: PropTypes.func,
    terminateAccountStatus: PropTypes.object,
    userEmail: PropTypes.object.isRequired,
  }

  state = { markedConsequences: false }

  componentWillUnmount() {
    this.props.resetTerminateAccountStatus()
  }

  getStateButton = () => {
    if (isLoading(this.props.terminateAccountStatus)) return true
    if (
      this.state.markedConsequences &&
      this.props.email === this.props.userEmail.email
    )
      return false
    return true
  }

  onToggleMarkedConsequences = () => {
    this.setState({ markedConsequences: !this.state.markedConsequences })
  }

  renderFormInputPasssword = () => {
    const errorMessage = _.get(this.props.terminateAccountStatus, 'error', null)
    return (
      <div>
        <input
          type="text"
          placeholder={this.props.userEmail.email}
          style={{ width: '350px' }}
          onChange={e => this.props.onTypeEmail(e.target.value)}
        />
        <span style={{ color: 'red' }}>{errorMessage}</span>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Delete account</h1>
        <p>This action cannot be undone.</p>
        <div>Please enter your email: {this.renderFormInputPasssword()}</div>
        <div style={{ marginTop: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={this.state.markedConsequences}
              onChange={this.onToggleMarkedConsequences}
            />
            I understand the consequences.
          </label>
        </div>
        <div>
          <button onClick={() => this.props.onBackButton()}>Back</button>
          <button
            onClick={this.props.onClickToDelete}
            disabled={this.getStateButton()}
          >
            Delete my account
          </button>
        </div>
      </div>
    )
  }
}

export default connect(
  createStructuredSelector({
    terminateAccountStatus: selectTerminateAccountStatus,
    userEmail: user,
    email: selectEmail,
  }),
  dispatch => ({
    resetTerminateAccountStatus: () => dispatch(resetTerminateAccountStatus()),
    onTypeEmail: email => dispatch(typeEmail(email)),
    onBackButton: () => dispatch(goBack()),
    onClickToDelete: () => dispatch(deleteAccount()),
  })
)(ConfirmEmailModal)
