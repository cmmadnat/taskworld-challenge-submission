import { fromJS } from 'immutable'

const initialState = fromJS({
  transferOwnershipStatus:{}
})
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
