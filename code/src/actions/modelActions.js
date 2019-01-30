import {commonAction_changeLeftAndTop, commonAction_changeWidthAndHeight, commonAction_setIsMouseOver} from "./commonActions";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";
import type {modelStateType} from "../reducers/modelReducer";

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
export const modelAction_requestToUpdateAllModelsLeftAndTop = () =>
{
    return (dispatch, getState) =>
    {
        let numberOfModels: number = getState().modelsContainerState.allModels.length;
        let totalHeight: number = 0;
        getState().modelsContainerState.allModels.forEach((model: modelStateType) => totalHeight += model.height);
        let initialTop: number = (getState().modelsAxisState.height - totalHeight) / 2;

        let distance: number = 0;

        for (let i = 0; i < numberOfModels; i++)
        {
            let initialLeft: number = (getState().modelsAxisState.width - getState().modelsContainerState.allModels[i].width) / 2;
            dispatch(commonAction_changeLeftAndTop(initialLeft, initialTop + distance, REDUCER_NAME.MODEL_REDUCER, i));
            distance += getState().modelsContainerState.allModels[i].height;
        }
    };
};

export const modelAction_requestToSetIsMouseOver = (isMouseOver: boolean, reducerIndex: number) =>
{

    return (dispatch, getState) =>
    {
        getState().modelsContainerState.allModels.forEach((model: modelStateType, index: number) =>
        {
            if (reducerIndex === index)
            {
                if (isMouseOver !== model.isMouseOver)
                {
                    dispatch(commonAction_setIsMouseOver(isMouseOver, REDUCER_NAME.MODEL_REDUCER, reducerIndex))
                }
            }
            else
            {
                if (model.isMouseOver)
                {
                    dispatch(commonAction_setIsMouseOver(false, REDUCER_NAME.MODEL_REDUCER, index))
                }
            }
        })
    };
};
