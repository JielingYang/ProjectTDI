export const COMMON_ACTION_TYPE = Object.freeze({
    CHANGE_WIDTH_AND_HEIGHT: "CHANGE_WIDTH_AND_HEIGHT",
});

export const commonAction_changeWidthAndHeight = (newWidth: number, newHeight: number, reducerName: string) =>
{
    return {
        type: COMMON_ACTION_TYPE.CHANGE_WIDTH_AND_HEIGHT,
        newWidth: newWidth,
        newHeight: newHeight,
        reducerName: reducerName,
    };
};
