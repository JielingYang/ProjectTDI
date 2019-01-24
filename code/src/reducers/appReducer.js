import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {COMMON_ACTION_TYPE} from "../actions/commonActions";

export type appStateType = {
    width: number,
    height: number,
}

const appDefaultState: appStateType = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Check reducerCreator for explanation of handlers
const appReducerHandlers = {
    [COMMON_ACTION_TYPE.CHANGE_WIDTH_AND_HEIGHT]: (state: appStateType, action) =>
    {
        console.log("app resize");
        let nextState: appStateType = deepCopy(state);
        nextState.width = action.newWidth;
        nextState.height = action.newHeight;
        return nextState;
    },
};

export default createReducer(appDefaultState, appReducerHandlers);
