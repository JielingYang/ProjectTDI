import {combineReducers} from "redux";
import appReducer from "./appReducer";
import modelsContainerReducer from "./modelsContainerReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    modelsContainerState: modelsContainerReducer,
});

export default rootReducer;
