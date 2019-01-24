import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";

export const MODELS_LIST_ACTION_TYPE = Object.freeze({
    MODELS_LIST_ACTION_ADD_MODEL: "MODELS_LIST_ACTION_ADD_MODEL",
});

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */
const modelsListAction_addModel = () =>
{
    return {
        type: MODELS_LIST_ACTION_TYPE.MODELS_LIST_ACTION_ADD_MODEL,
        reducerName: REDUCER_NAME.MODELS_LIST_REDUCER,
    };
};

/* ************************** Requesting actions ****************************************** */
/* This kind of actions check on new data to decide whether to call updating actions or not */
/* **************************************************************************************** */
