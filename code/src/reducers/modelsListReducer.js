import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {MODELS_LIST_ACTION_TYPE} from "../actions/modelsListActions";
import {modelDefaultState} from "./modelReducer";

export type modelsListStateType = {
    modelsList: Array<>
}

const modelsListDefaultState: modelsListStateType = {
    modelsList: []
};

// Check reducerCreator for explanation of handlers
const modelsListReducerHandlers = {
    [MODELS_LIST_ACTION_TYPE.MODELS_LIST_ACTION_ADD_MODEL]: (state: modelsListStateType) =>
    {
        let nextState: modelsListStateType = deepCopy(state);
        nextState.modelsList.push(modelDefaultState);
        return nextState;
    },
};

export default createReducer(modelsListDefaultState, modelsListReducerHandlers);
