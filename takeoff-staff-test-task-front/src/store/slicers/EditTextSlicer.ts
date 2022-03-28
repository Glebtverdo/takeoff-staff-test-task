import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState : {editText: {[key:string] : [string, boolean]} | null} = {
	editText: null,
}

const editTextSlice = createSlice({
	name: 'editText',
	initialState,
	reducers: {
		changeEditText: (state: {editText: {[key:string] : [string, boolean]} | null},
			action: PayloadAction<{id:string, str: string}>) =>
		{
			const {id, str} = action.payload;
			if (state.editText){
				state.editText[id][0] = str
			}
		},
		changeShowEdit: (state: {editText: {[key:string] : [string, boolean]} | null},
			action: PayloadAction<{id:string, bool: boolean, str: string}>) =>
		{
			const {id, bool, str} = action.payload;
			if (state.editText){
				if (state.editText[id]){
					state.editText[id][1] = bool
				}else{
					state.editText[id] = [str, bool]
				}
				
			}else
				state.editText = {
					[id]: [str, bool]
				}
		}
	}
})

export const {changeEditText, changeShowEdit} = editTextSlice.actions
export default editTextSlice.reducer