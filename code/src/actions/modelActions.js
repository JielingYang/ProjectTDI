import {commonAction_changeLeftAndTop, commonAction_changeWidthAndHeight} from "./commonActions";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";

export const MODEL_ACTION_TYPE = Object.freeze({});

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

/* ************************** Requesting actions ****************************************** */
/* This kind of actions check on new data to decide whether to call updating actions or not */
/* **************************************************************************************** */
// Update all models' size to the same with given width and height
export const modelAction_requestToUpdateAllModelsWidthAndHeight = (newWidth: number, newHeight: number) =>
{
    return (dispatch, getState) =>
    {
        let numberOfModels: number = getState().modelsContainerState.allModels.length;

        for (let i = 0; i < numberOfModels; i++)
        {
            dispatch(commonAction_changeWidthAndHeight(newWidth, newHeight, REDUCER_NAME.MODEL_REDUCER, i));
        }
    };
};
// Update all models' left and top according to given initial left and top values
export const modelAction_requestToUpdateAllModelsLeftAndTop = (initialLeft: number, initialTop: number) =>
{
    return (dispatch, getState) =>
    {
        let numberOfModels: number = getState().modelsContainerState.allModels.length;
        let distance: number = getState().modelsAxisState.height / (numberOfModels - 1);

        for (let i = 0; i < numberOfModels; i++)
        {
            dispatch(commonAction_changeLeftAndTop(initialLeft, initialTop + distance * i, REDUCER_NAME.MODEL_REDUCER, i));
        }
    };
};
