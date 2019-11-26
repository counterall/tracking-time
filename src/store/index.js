import {
    createStore, combineReducers
} from 'redux';

import { todayReducer } from './Today';

export const reducers = {
    today: todayReducer
};

const store = createStore(
    combineReducers(reducers),
    window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true
    })
);

export default store;