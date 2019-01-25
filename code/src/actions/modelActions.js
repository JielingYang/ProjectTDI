export const MODEL_ACTION_TYPE = Object.freeze({
    MODEL_ACTION_CHANGE_MODEL_WIDTH_AND_HEIGHT: "MODEL_ACTION_CHANGE_MODEL_WIDTH_AND_HEIGHT",
});

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */
export const modelAction_changeModelWidthAndHeight = (newWidth: number, newHeight: number) =>
{
    return {
        type: MODEL_ACTION_TYPE.MODEL_ACTION_CHANGE_MODEL_WIDTH_AND_HEIGHT,
    };
};

/* ************************** Requesting actions ****************************************** */
/* This kind of actions check on new data to decide whether to call updating actions or not */
/* **************************************************************************************** */
