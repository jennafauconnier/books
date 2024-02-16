import { configureStore, combineReducers } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { initializePersistor } from './persistor'



const persistConfig = {
    key: 'root',
    storage,
}

const reducer = combineReducers({
    auth: rootReducer,
  })

const store = configureStore({
    reducer: persistReducer(persistConfig, reducer),
})

initializePersistor(store)


export default store