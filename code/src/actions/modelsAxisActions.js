import type {modelsAxisStateType} from "../reducers/modelsAxisReducer";
import {MAX_AXIS_ROTATION_DEGREE_VALUE} from "../utilities/CONSTANTS_NUMBER";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";
import {commonAction_changeWidthAndHeight} from "./commonActions";

export const MODELS_AXIS_ACTION_TYPE = Object.freeze({
    MODELS_AXIS_ACTION_UPDATE_AXIS_ROTATION_X_Y: "MODELS_AXIS_ACTION_UPDATE_AXIS_ROTATION_X_Y",
});

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */
const modelsAxisAction_updateRotationXY = (newRotationX: number, newRotationY: number) =>
{
    return {
        type: MODELS_AXIS_ACTION_TYPE.MODELS_AXIS_ACTION_UPDATE_AXIS_ROTATION_X_Y,
        newRotationX: newRotationX,
        newRotationY: newRotationY,
    };
};

/* ************************** Requesting actions ****************************************** */
/* This kind of actions check on new data to decide whether to call updating actions or not */
/* **************************************************************************************** */
export const modelsAxisAction_requestToUpdateAxisRotationXY = (newMouseMoveX: number, newMouseMoveY: number) =>
{
    return (dispatch, getState) =>
    {
        let modelsAxisState: modelsAxisStateType = getState().modelsAxisState;

        let mouseXToAppWidthRatio: number = newMouseMoveX / getState().appState.width;
        let mouseYToAppHeightRatio: number = newMouseMoveY / getState().appState.height;

        let newRotationX: number = Number(((1 - mouseYToAppHeightRatio) * MAX_AXIS_ROTATION_DEGREE_VALUE - MAX_AXIS_ROTATION_DEGREE_VALUE / 2).toFixed(2));
        let newRotationY: number = Number((MAX_AXIS_ROTATION_DEGREE_VALUE / 2 - (1 - mouseXToAppWidthRatio) * MAX_AXIS_ROTATION_DEGREE_VALUE).toFixed(2));

        // Compare against old values
        if (modelsAxisState.rotationX !== newRotationX || modelsAxisState.rotationY !== newRotationY)
        {
            dispatch(modelsAxisAction_updateRotationXY(newRotationX, newRotationY));
        }
    };
};
