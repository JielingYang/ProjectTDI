import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {MODELS_CONTAINER_ACTION_TYPE} from "../actions/modelsContainerActions";
import {modelDefaultState} from "./modelReducer";
import {COMMON_ACTION_TYPE} from "../actions/commonActions";
import modelReducer from "./modelReducer";
import type {modelStateType} from "./modelReducer";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";

export type modelsContainerStateType = {
    reducerName: string,
    width: number,
    height: number,
    left: number,
    top: number,
    perspective: number,
    allModels: Array<modelStateType>,
}

const modelsContainerDefaultState: modelsContainerStateType = {
    reducerName: REDUCER_NAME.MODELS_CONTAINER_REDUCER,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    perspective: 0,
    allModels: [],
};

// Check reducerCreator for explanation of handlers
const modelsContainerReducerHandlers = {
    [COMMON_ACTION_TYPE.CHANGE_WIDTH_AND_HEIGHT]: (state: modelsContainerStateType, action) =>
    {
        if (action.reducerName === state.reducerName)
        {
            let nextState: modelsContainerStateType = deepCopy(state);
            nextState.width = action.newWidth;
            nextState.height = action.newHeight;
            return nextState;
        }
        else if (action.reducerName === REDUCER_NAME.MODEL_REDUCER && action.reducerIndex >= 0 && action.reducerIndex < state.allModels.length)
        {
            let nextState: modelsContainerStateType = deepCopy(state);
            nextState.allModels[action.reducerIndex] = modelReducer(nextState.allModels[action.reducerIndex], action);
            return nextState;
        }
        return state;
    },
    [COMMON_ACTION_TYPE.CHANGE_LEFT_AND_TOP]: (state: modelsContainerStateType, action) =>
    {
        if (action.reducerName === state.reducerName)
        {
            let nextState: modelsContainerStateType = deepCopy(state);
            nextState.left = action.newLeft;
            nextState.top = action.newTop;
            return nextState;
        }
        else if (action.reducerName === REDUCER_NAME.MODEL_REDUCER && action.reducerIndex >= 0 && action.reducerIndex < state.allModels.length)
        {
            let nextState: modelsContainerStateType = deepCopy(state);
            nextState.allModels[action.reducerIndex] = modelReducer(nextState.allModels[action.reducerIndex], action);
            return nextState;
        }
        return state;
    },
    [MODELS_CONTAINER_ACTION_TYPE.MODELS_CONTAINER_ACTION_ADD_MODEL]: (state: modelsContainerStateType) =>
    {
        let nextState: modelsContainerStateType = deepCopy(state);
        nextState.allModels.push(modelDefaultState);
        return nextState;
    },
    [MODELS_CONTAINER_ACTION_TYPE.MODELS_CONTAINER_ACTION_UPDATE_MODELS_CONTAINER_PERSPECTIVE]: (state: modelsContainerStateType, action) =>
    {
        let nextState: modelsContainerStateType = deepCopy(state);
        nextState.perspective = action.newPerspective;
        return nextState;
    },
};

// const

export default createReducer(modelsContainerDefaultState, modelsContainerReducerHandlers);
