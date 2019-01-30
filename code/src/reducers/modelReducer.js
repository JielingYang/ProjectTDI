import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {COMMON_ACTION_TYPE} from "../actions/commonActions";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";
import type {modelsAxisStateType} from "./modelsAxisReducer";

export type modelStateType = {
    reducerName: string,
    width: number,
    height: number,
    left: number,
    top: number,
    z: number,
    rotationX: number,
    rotationY: number,
    rotationZ: number,
    isSelected: boolean,
    isMouseOver: boolean,
}

export const modelDefaultState: modelStateType = {
    reducerName: REDUCER_NAME.MODEL_REDUCER,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    z: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    isSelected: false,
    isMouseOver: false,
};

// Check reducerCreator for explanation of handlers
const modelReducerHandlers = {
    [COMMON_ACTION_TYPE.CHANGE_WIDTH_AND_HEIGHT]: (state: modelStateType, action) =>
    {
        if (action.reducerName === state.reducerName)
        {
            let nextState: modelStateType = deepCopy(state);
            nextState.width = action.newWidth;
            nextState.height = action.newHeight;
            return nextState;
        }
        return state;
    },
    [COMMON_ACTION_TYPE.CHANGE_LEFT_AND_TOP]: (state: modelStateType, action) =>
    {
        if (action.reducerName === state.reducerName)
        {
            let nextState: modelStateType = deepCopy(state);
            nextState.left = action.newLeft;
            nextState.top = action.newTop;
            return nextState;
        }
        return state;
    },
    [COMMON_ACTION_TYPE.SET_IS_MOUSE_OVER]: (state: modelStateType, action) =>
    {
        if (action.reducerName === state.reducerName)
        {
            let nextState: modelStateType = deepCopy(state);
            nextState.isMouseOver = action.isMouseOver;
            return nextState;
        }
        return state;
    },
    [COMMON_ACTION_TYPE.SET_IS_SELECTED]: (state: modelStateType, action) =>
    {
        if (action.reducerName === state.reducerName)
        {
            let nextState: modelStateType = deepCopy(state);
            nextState.isSelected = action.isSelected;
            return nextState;
        }
        return state;
    },
};

export default createReducer(modelDefaultState, modelReducerHandlers);
