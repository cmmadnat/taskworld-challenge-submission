import React from 'react'
import propTypes from 'prop-types'
import _ from 'lodash'
import TransferOwnershipModal, {
  WorkspaceGroupRows,
} from './TransferOwnershipModal.react'
import AssignOwnership from './AssignOwnership.react'

class TransferModal extends React.Component {
  state = {
    transferData: [],
  }
  render() {
    const {
      requiredTransferWorkspaces,
      deleteWorkspaces,
      loading,
      user,
      getTransferData,
      onAssignToUser,
      onSetNextPage,
      transferOwnershipStatus,
    } = this.props

    const transferData = getTransferData()
    const totalAssigned = transferData.length
    const totalWorkspaceRequiredTransfer = requiredTransferWorkspaces.length
    const totalWorkspaceDelete = deleteWorkspaces.length
    const disabledNextPage =
      totalAssigned < totalWorkspaceRequiredTransfer ||
      loading ||
      transferOwnershipStatus.status === 'error'
    return (
      <TransferOwnershipModal
        nextPage={onSetNextPage}
        loading={loading}
        disabledNextPage={disabledNextPage}
      >
        {transferOwnershipStatus.status === 'error' ? (
          <p style={{ color: 'red' }}>
            error : Error code "{transferOwnershipStatus.errorCode}"
          </p>
        ) : (
          <p />
        )}
        <WorkspaceGroupRows
          workspaces={requiredTransferWorkspaces}
          groupTitle="The following workspaces require ownership transfer:"
          shouldDisplay={totalWorkspaceRequiredTransfer > 0}
        >
          <AssignOwnership
            user={user}
            transferData={getTransferData()}
            onAssignToUser={onAssignToUser}
          />
        </WorkspaceGroupRows>
        <WorkspaceGroupRows
          workspaces={deleteWorkspaces}
          groupTitle="The following workspaces will be deleted:"
          shouldDisplay={totalWorkspaceDelete > 0}
        />
      </TransferOwnershipModal>
    )
  }
}
TransferModal.propTypes = {
  requiredTransferWorkspaces: propTypes.array.isRequired,
  transferOwnershipStatus: propTypes.object.isRequired,
  deleteWorkspaces: propTypes.array.isRequired,
  loading: propTypes.bool.isRequired,
  user: propTypes.object.isRequired,
  getTransferData: propTypes.func.isRequired,
  onAssignToUser: propTypes.func.isRequired,
  onSetNextPage: propTypes.func.isRequired,
}
export default TransferModal