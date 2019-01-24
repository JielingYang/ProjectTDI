import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";

type modelStateType = {
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
const modelReducerHandlers = {};

export default createReducer(modelDefaultState, modelReducerHandlers);
