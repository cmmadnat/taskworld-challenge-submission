import fetch from 'cross-fetch'
import * as LoadState from '../reference/LoadState'

export default payload => {
  // Note that there is 30% chance of getting error from the server
  return fetch(
    'https://us-central1-tw-account-deletion-challenge.cloudfunctions.net/terminateAccount',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  ).then(response => {
    if (response.status === 200) {
      // return {
      //   terminateAccountStatus: LoadState.handleLoaded({}),
      // }
      return true
    } else {
      // return {
      //   terminateAccountStatus: LoadState.handleLoadFailedWithError(
      //     'Error deleting account'
      //   )({}),
      // }
      throw new Error('Error deleteing account')
    }
  })
}
