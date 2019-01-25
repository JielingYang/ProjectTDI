import type {modelsContainerStateType} from "../reducers/modelsContainerReducer";

export const MODELS_CONTAINER_ACTION_TYPE = Object.freeze({
    MODELS_CONTAINER_ACTION_ADD_MODEL: "MODELS_CONTAINER_ACTION_ADD_MODEL",
    MODELS_CONTAINER_ACTION_UPDATE_MODELS_CONTAINER_PERSPECTIVE: "MODELS_CONTAINER_ACTION_UPDATE_MODELS_CONTAINER_PERSPECTIVE",
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
        let viewportMin: number = window.innerWidth < window.innerHeight
                                  ? window.innerWidth
                                  : window.innerHeight;
        let defaultPerspective: number = viewportMin * 0.8;
        let perspective: number = newPerspective === undefined
                                  ? defaultPerspective
                                  : newPerspective;

        if (perspective !== modelsContainerState.perspective)
        {
            dispatch(modelsContainerAction_updateModelsContainerPerspective(perspective));
        }
    };
};
