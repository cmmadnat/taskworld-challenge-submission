import { fromJS } from 'immutable'

const initialState = fromJS({
  terminateAccountStatus: {},
})
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
