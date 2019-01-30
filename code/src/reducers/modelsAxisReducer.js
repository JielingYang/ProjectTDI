import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {COMMON_ACTION_TYPE} from "../actions/commonActions";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";
import {MODELS_AXIS_ACTION_TYPE} from "../actions/modelsAxisActions";

export type modelsAxisStateType = {
    reducerName: string,
    width: number,
    height: number,
    left: number,
    top: number,
    z: number,
    rotationX: number,
    rotationY: number,
    rotationZ: number,
}

export const modelDefaultState: modelsAxisStateType = {
    reducerName: REDUCER_NAME.MODELS_AXIS_REDUCER,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    z: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
};

// Check reducerCreator for explanation of handlers
const modelReducerHandlers = {
    [COMMON_ACTION_TYPE.CHANGE_WIDTH_AND_HEIGHT]: (state: modelsAxisStateType, action) =>
    {
        if (action.reducerName === state.reducerName)
        {
            let nextState: modelsAxisStateType = deepCopy(state);
            nextState.width = action.newWidth;
            nextState.height = action.newHeight;
            return nextState;
        }
        return state;
    },
    [COMMON_ACTION_TYPE.CHANGE_LEFT_AND_TOP]: (state: modelsAxisStateType, action) =>
    {
        if (action.reducerName === state.reducerName)
        {
            let nextState: modelsAxisStateType = deepCopy(state);
            nextState.left = action.newLeft;
            nextState.top = action.newTop;
            return nextState;
        }
        return state;
    },
    [MODELS_AXIS_ACTION_TYPE.MODELS_AXIS_ACTION_UPDATE_AXIS_ROTATION_X_Y]: (state: modelsAxisStateType, action) =>
    {
        let nextState: modelsAxisStateType = deepCopy(state);
        nextState.rotationX = action.newRotationX;
        nextState.rotationY = action.newRotationY;
        return nextState;
    },
};

export default createReducer(modelDefaultState, modelReducerHandlers);
