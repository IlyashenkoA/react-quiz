import { combineReducers } from 'redux';

import { QuizReducer } from './QuizReducer';

export const rootReducer = combineReducers({
	QuizReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
