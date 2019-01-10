import { fromJS } from 'immutable'

const initialState = fromJS({})
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
