import { LoginState } from "utils/types";
import { USER_LOGIN_DETAILS } from "constants/localStorage";
import { configureStore } from "@reduxjs/toolkit";
import { getItemFromStorage } from "utils/localStorage";
import loginSlice from "./AuthService/loginSlice";

const userLoginDetailsFromStorage = getItemFromStorage(USER_LOGIN_DETAILS) ?? {};

const persistedState: {
    userLoginDetails?: LoginState;
} = {
    userLoginDetails: {
        isLoggedIn: userLoginDetailsFromStorage.isLoggedIn || false,
        isLoading: false,
        error: null
    }
};

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        userLoginDetails: loginSlice
    },
    preloadedState: persistedState
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type ReduxDispatch = typeof store.dispatch;

export default store;
