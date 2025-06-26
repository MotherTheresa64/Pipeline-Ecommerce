import { useDispatch, useSelector } from 'react-redux';
// Custom typed version of useDispatch hook.
// Ensures that dispatch knows about the specific actions in your app (AppDispatch type).
export const useAppDispatch = () => useDispatch();
// Custom typed version of useSelector hook.
// Provides type safety and autocomplete for selecting state from the Redux store (RootState).
export const useAppSelector = useSelector;
