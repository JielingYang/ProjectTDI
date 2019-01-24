import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {COMMON_ACTION_TYPE} from "../actions/commonActions";

export type appStateType = {
    width: number,
    height: number,
    left: number,
    top: number,
}

const appDefaultState: appStateType = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
};

// Check reducerCreator for explanation of handlers
const appReducerHandlers = {
    [COMMON_ACTION_TYPE.CHANGE_WIDTH_AND_HEIGHT]: (state: appStateType, action) =>
    {
        let nextState: appStateType = deepCopy(state);
        nextState.width = action.newWidth;
        nextState.height = action.newHeight;
        return nextState;
    },
};

export default createReducer(appDefaultState, appReducerHandlers);
