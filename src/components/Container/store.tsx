import {  configureStore } from '@reduxjs/toolkit';
import reducer from './slice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
	reducer,
});

export type RootTemplateState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTemplateDisplatch = useDispatch.withTypes<AppDispatch>();
export const useTemplateSelector = useSelector.withTypes<RootTemplateState>();
