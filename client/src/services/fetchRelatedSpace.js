import fetch from 'cross-fetch'

export default userID => {
  const response = fetch(
    `https://us-central1-tw-account-deletion-challenge.cloudfunctions.net/fetchWorkspaces?userId=${userID}`,
    {
      mode: 'cors',
    }
  )
  return response.then(data => data.json())
}
