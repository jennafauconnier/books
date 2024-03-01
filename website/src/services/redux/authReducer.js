import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  token: null,
  user: null,
}

const slice = createSlice({
  name: 'auth',
  initialState: () => INITIAL_STATE,
  reducers: {
    signin: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }
    },
    signup: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }
    },
    logout: ( state, action ) => { return {...INITIAL_STATE} },
    delete: () => { return {...INITIAL_STATE} },
  },
})

export const authSliceActions = slice.actions
export default slice.reducer

