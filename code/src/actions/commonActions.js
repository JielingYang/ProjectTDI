export const COMMON_ACTION_TYPE = Object.freeze({
    CHANGE_WIDTH_AND_HEIGHT: "CHANGE_WIDTH_AND_HEIGHT",
    CHANGE_LEFT_AND_TOP: "CHANGE_LEFT_AND_TOP",
    CHANGE_Z_DISTANCE: "CHANGE_Z_DISTANCE"
});

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

export const commonAction_changeZDistance = (newZ: number, reducerName: string, reducerIndex: number) =>
{
    return {
        type: COMMON_ACTION_TYPE.CHANGE_Z_DISTANCE,
        newZ: newZ,
        reducerName: reducerName,
        reducerIndex: reducerIndex,
    };
};
