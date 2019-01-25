import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {COMMON_ACTION_TYPE} from "../actions/commonActions";
import {APP_ACTION_TYPE} from "../actions/appActions";
import {APP_REFRESHING_TIME_GAP} from "../utilities/CONSTANTS_TIME";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";

export type appStateType = {
    reducerName: REDUCER_NAME,
    width: number,
    height: number,
    left: number,
    top: number,
    maximumRefreshingTimeGap: number,
    mouseMoveEventTimeStamp: number,
}

const appDefaultState: appStateType = {
    reducerName: REDUCER_NAME.APP_REDUCER,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    maximumRefreshingTimeGap: APP_REFRESHING_TIME_GAP,
    mouseMoveEventTimeStamp: 0,
};

// Check reducerCreator for explanation of handlers
const appReducerHandlers = {
    [COMMON_ACTION_TYPE.CHANGE_WIDTH_AND_HEIGHT]: (state: appStateType, action) =>
    {
        if (action.reducerName === state.reducerName)
        {
            let nextState: appStateType = deepCopy(state);
            nextState.width = action.newWidth;
            nextState.height = action.newHeight;
            return nextState;
        }
        return state;
    },
    [APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MAXIMUM_REFRESHING_TIME_GAP]: (state: appStateType, action) =>
    {
        // No deepCopy here because I don't want the change of mouse move event timestamp to cause re-render of the appComponent
        state.maximumRefreshingTimeGap = action.newMaximumRefreshingTimeGap;
        return state;
    },
    [APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_MOUSE_MOVE_EVENT_TIME_STAMP]: (state: appStateType, action) =>
    {
        // No deepCopy here because I don't want the change of mouse move event timestamp to cause re-render of the appComponent
        state.mouseMoveEventTimeStamp = action.newMouseMoveEventTimeStamp;
        return state;
    },
};

export default createReducer(appDefaultState, appReducerHandlers);
