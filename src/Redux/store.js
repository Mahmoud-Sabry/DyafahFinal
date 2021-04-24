import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
// ...
import rootReducer from './Slices/rootReducer';
import {initsagas} from './Sagas/initsagas';
// ...

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({thunk:false}), sagaMiddleware]
},
);

initsagas(sagaMiddleware);

export default store;