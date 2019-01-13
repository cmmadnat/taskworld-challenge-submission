import { fromJS } from 'immutable'

const initialState = fromJS({

      requiredTransferWorkspaces: [],
      transferOwnershipStatus: {},
      deleteWorkspaces: [],
      loading: false,
      user: {},
})
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
