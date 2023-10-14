import { AppDispatch, RootState } from "@/redux-rtk/app/store";
import classNames from "classnames";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const cx = classNames;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector