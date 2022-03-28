import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userAPI} from "./APIs/UserAPI";
import userReducer from "./slicers/UserSlicer";
import editTextReducer from "./slicers/EditTextSlicer";


const rootReducer = combineReducers({
	userReducer,
	editTextReducer,
	[userAPI.reducerPath]:  userAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
		.concat(userAPI.middleware)
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']