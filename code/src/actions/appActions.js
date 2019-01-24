import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";
import type {appStateType} from "../reducers/appReducer";

export const APP_ACTION_TYPE = Object.freeze({
    APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP: "APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP",
    APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP: "APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP",
    APP_ACTION_UPDATE_APP_PERSPECTIVE: "APP_ACTION_UPDATE_APP_PERSPECTIVE",
});

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */
const appAction_updateAppMaximumRefreshingTimeGap = (newMaximumRefreshingTimeGap: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP,
        newMaximumRefreshingTimeGap: newMaximumRefreshingTimeGap,
        reducerName: REDUCER_NAME.APP_REDUCER,
    };
};

const appAction_updateAppMouseMoveEventTimeStamp = (newMouseMoveEventTimeStamp: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP,
        newMouseMoveEventTimeStamp: newMouseMoveEventTimeStamp,
        reducerName: REDUCER_NAME.APP_REDUCER,
    };
};

const appAction_updateAppPerspective = (newPerspective: number) =>
{
    return {
        type: APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_PERSPECTIVE,
        newPerspective: newPerspective,
        reducerName: REDUCER_NAME.APP_REDUCER,
    };
};

/* ************************** Requesting actions ****************************************** */
/* This kind of actions check on new data to decide whether to call updating actions or not */
/* **************************************************************************************** */
export const appAction_requestToUpdateAppMouseMoveRelatedData = (newMouseMoveEventTimeStamp: number, mouseMoveX: number, mouseMoveY: number) =>
{
    return (dispatch, getState) =>
    {
        let appState: appStateType = getState().appState;

        let appMaximumRefreshingTimeGap: number = appState.maximumRefreshingTimeGap;
        let currentTimestamp: number = Math.trunc(newMouseMoveEventTimeStamp);
        let previousTimestamp: number = appState.mouseMoveEventTimeStamp;

        /*
         I use timestamp to prevent new data being sent to reducer too often
         New data will be sent only if current timestamp is at least 10ms (by default) younger than previous one
         */
        if (currentTimestamp - previousTimestamp >= appMaximumRefreshingTimeGap)
        {
            dispatch(appAction_updateAppMouseMoveEventTimeStamp(currentTimestamp)); // Update timestamp to prepare next check
            // dispatch(engineAction_requestToUpdateEngineRotation(mouseMoveX, mouseMoveY));
        }
    };
};

export const appAction_requestToUpdateAppPerspective = (newPerspective: number) =>
{
    return (dispatch, getState) =>
    {
        let appState: appStateType = getState().appState;

        if (newPerspective !== appState.perspective)
        {
            dispatch(appAction_updateAppPerspective(newPerspective));
        }
    };
};
