import {combineReducers} from "redux";
import appReducer from "./appReducer";
import modelsListReducer from "./modelsListReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    modelsListState: modelsListReducer,
});

export default rootReducer;
