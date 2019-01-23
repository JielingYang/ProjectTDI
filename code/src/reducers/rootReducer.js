import {combineReducers} from "redux";
import appReducer from "../../../../HomePageProject/react-client/src/reducers/appReducer";

const rootReducer = combineReducers({
    appState: appReducer,
});

export default rootReducer;
