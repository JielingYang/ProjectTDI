import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {COMMON_ACTION_TYPE} from "../actions/commonActions";
import type {appStateType} from "./appReducer";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";

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
            let nextState: appStateType = deepCopy(state);
            nextState.width = action.newWidth;
            nextState.height = action.newHeight;
            return nextState;
        }
        return state;
    },
};

export default createReducer(modelDefaultState, modelReducerHandlers);
