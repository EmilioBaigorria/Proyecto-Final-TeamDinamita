import { configureStore } from '@reduxjs/toolkit'
import ActiveEntrepriseReducer from "../slices/ActiveEnterpriseReducer"
import ActiveOfficeReducer from "../slices/ActiveOfficeReducer"
import enterprisesReducer from "../slices/EmpresasSlice"


export const store = configureStore({
  reducer: {
    ActiveEntrepriseReducer:ActiveEntrepriseReducer,
    ActiveOfficeReducer:ActiveOfficeReducer,
    enterprises: enterprisesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch