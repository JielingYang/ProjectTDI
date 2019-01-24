import {combineReducers} from "redux";
import appReducer from "./appReducer";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";
import {wrapReducerWithName} from "./reducerCreator";

const rootReducer = combineReducers({
    appState: wrapReducerWithName(appReducer, REDUCER_NAME.APP_REDUCER),
});

export default rootReducer;
