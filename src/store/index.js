import { combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import user from './user'

const rootReducer = combineReducers({
    user
})

const configureStore = () => {
    const store = createStore(rootReducer, composeWithDevTools());

    return { store }
}

export default configureStore;