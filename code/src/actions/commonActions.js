export const COMMON_ACTION_TYPE = Object.freeze({
    CHANGE_WIDTH_AND_HEIGHT: "CHANGE_WIDTH_AND_HEIGHT",
    CHANGE_LEFT_AND_TOP: "CHANGE_LEFT_AND_TOP",
    SET_IS_SELECTED: "SET_IS_SELECTED",
    SET_IS_MOUSE_OVER: "SET_IS_MOUSE_OVER"
});

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */
export const commonAction_changeWidthAndHeight = (newWidth: number, newHeight: number, reducerName: string, reducerIndex: number) =>
{
    return {
        type: COMMON_ACTION_TYPE.CHANGE_WIDTH_AND_HEIGHT,
        newWidth: newWidth,
        newHeight: newHeight,
        reducerName: reducerName,
        reducerIndex: reducerIndex,
    };
};

export const commonAction_changeLeftAndTop = (newLeft: number, newTop: number, reducerName: string, reducerIndex: number) =>
{
    return {
        type: COMMON_ACTION_TYPE.CHANGE_LEFT_AND_TOP,
        newLeft: newLeft,
        newTop: newTop,
        reducerName: reducerName,
        reducerIndex: reducerIndex,
    };
};

export const commonAction_setIsSelected = (isSelected: boolean, reducerName: string, reducerIndex: number) =>
{
    return {
        type: COMMON_ACTION_TYPE.SET_IS_MOUSE_OVER,
        isSelected: isSelected,
        reducerName: reducerName,
        reducerIndex: reducerIndex,
    };
};

export const commonAction_setIsMouseOver = (isMouseOver: boolean, reducerName: string, reducerIndex: number) =>
{
    return {
        type: COMMON_ACTION_TYPE.SET_IS_MOUSE_OVER,
        isMouseOver: isMouseOver,
        reducerName: reducerName,
        reducerIndex: reducerIndex,
    };
};
