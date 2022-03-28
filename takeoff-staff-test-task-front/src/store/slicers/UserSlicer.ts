import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState : {userId: string | null} = {
	userId: localStorage.getItem("userId") ?? null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
		changeUserId: (state: {userId: string | null}, action: PayloadAction<string | null>) =>
		{
			state.userId = action.payload
		}
  }
})

export const {changeUserId} = userSlice.actions
export default userSlice.reducer