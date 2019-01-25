import type {modelsContainerStateType} from "../reducers/modelsContainerReducer";
import {getViewportMin} from "../utilities/UTILITIES";

export const MODELS_CONTAINER_ACTION_TYPE = Object.freeze({
    MODELS_CONTAINER_ACTION_ADD_MODEL: "MODELS_CONTAINER_ACTION_ADD_MODEL",
    MODELS_CONTAINER_ACTION_UPDATE_MODELS_CONTAINER_PERSPECTIVE: "MODELS_CONTAINER_ACTION_UPDATE_MODELS_CONTAINER_PERSPECTIVE",
    MODELS_CONTAINER_ACTION_UPDATE_AXIS_ROTATION_X_Y: "MODELS_CONTAINER_ACTION_UPDATE_AXIS_ROTATION_X_Y",
});

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */
export const modelsContainerAction_addModel = () =>
{
    return {
        type: MODELS_CONTAINER_ACTION_TYPE.MODELS_CONTAINER_ACTION_ADD_MODEL,
    };
};

const modelsContainerAction_updateModelsContainerPerspective = (newPerspective: number) =>
{
    return {
        type: MODELS_CONTAINER_ACTION_TYPE.MODELS_CONTAINER_ACTION_UPDATE_MODELS_CONTAINER_PERSPECTIVE,
        newPerspective: newPerspective,
    };
};

/* ************************** Requesting actions ****************************************** */
/* This kind of actions check on new data to decide whether to call updating actions or not */
/* **************************************************************************************** */

export const modelsContainerAction_requestToUpdateModelsContainerPerspective = (newPerspective: number) =>
{
    return (dispatch, getState) =>
    {
        let modelsContainerState: modelsContainerStateType = getState().modelsContainerState;
        let defaultPerspective: number = getViewportMin() * 0.8;
        let perspective: number = newPerspective === undefined
                                  ? defaultPerspective
                                  : newPerspective;

        if (perspective !== modelsContainerState.perspective)
        {
            dispatch(modelsContainerAction_updateModelsContainerPerspective(perspective));
        }
    };
};
