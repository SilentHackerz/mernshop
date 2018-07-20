import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
// Note, I am going to name my root reducer as index.js. Hence no need to mention separately /reducers/index

const initialState = {};

// put any middleware inside an array
const middleware = [thunk];

// For the third argument to createStore(), which takes some optional store enhancers, since I am using redux-tools, I want to wrap the applyMiddleware() in this compose() function.
// To apply multiple store enhancers, you may use compose(). - per official doc - https://redux.js.org/api-reference/createstore

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store;

/* To be able to use redux dev-tool - I need to put this line -
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 https://github.com/zalmoxisus/redux-devtools-extension#usage
*/