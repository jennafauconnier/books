import { persistStore } from 'redux-persist'

export let persistor

export const initializePersistor = (store) => {
  persistor = persistStore(store)
}
