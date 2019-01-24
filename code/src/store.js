import rootReducer from "./reducers/rootReducer";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production')
{
    middleware.push(logger);
}
// Add middleware. NOTE: Order of middleware matters, thunk before logger
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
