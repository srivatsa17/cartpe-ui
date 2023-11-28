import { ReduxDispatch, RootState } from "redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useReduxDispatch: () => ReduxDispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
