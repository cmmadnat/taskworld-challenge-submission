export default userID => {
  const response = window.fetch(
    `https://us-central1-tw-account-deletion-challenge.cloudfunctions.net/fetchWorkspaces?userId=${userID}`,
    {
      mode: 'cors',
    }
  )
  return response.then(data => data.json())
}
