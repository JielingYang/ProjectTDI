import {combineReducers} from "redux";
import appReducer from "./appReducer";
import modelsContainerReducer from "./modelsContainerReducer";
import modelsAxisReducer from "./modelsAxisReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    modelsContainerState: modelsContainerReducer,
    modelsAxisState: modelsAxisReducer,
});

export default rootReducer;
