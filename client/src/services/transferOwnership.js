import fetch from 'cross-fetch'

export default (fromUser, toUser, workspace) => {
  const response = fetch(
    'https://us-central1-tw-account-deletion-challenge.cloudfunctions.net/checkOwnership',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workspaceId: workspace.spaceId,
        fromUserId: fromUser._id,
        toUserId: toUser._id,
      }),
    }
  )
    .then(response => {
      if (response.status === 200) return 'success'
      else return 'Conflict'
    })
    .catch(e => console.error(e))

  //   if (response.status === 200) {
  //     this.setState({
  //       transferOwnershipStatus: {
  //         workspaceId: workspace.spaceId,
  //         toUserId: toUser._id,
  //         ...LoadState.completed,
  //       },
  //     })
  //   } else {
  //     const errorCode = await response.text()
  //     this.setState({
  //       transferOwnershipStatus: {
  //         workspaceId: workspace.spaceId,
  //         toUserId: toUser._id,
  //         ...LoadState.error,
  //         errorCode,
  //       },
  //     })
  //   }
  return response
}
