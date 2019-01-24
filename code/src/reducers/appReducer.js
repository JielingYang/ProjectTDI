import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {COMMON_ACTION_TYPE} from "../actions/commonActions";
import {APP_ACTION_TYPE} from "../actions/appActions";
import {APP_REFRESHING_TIME_GAP} from "../utilities/CONSTANTS_TIME";

export type appStateType = {
    width: number,
    height: number,
    left: number,
    top: number,
    maximumRefreshingTimeGap: number,
    mouseMoveEventTimeStamp: number,
    perspective: number,
}

const appDefaultState: appStateType = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    maximumRefreshingTimeGap: APP_REFRESHING_TIME_GAP,
    mouseMoveEventTimeStamp: 0,
    perspective: 0,
};

// Check reducerCreator for explanation of handlers
const appReducerHandlers = {
    [COMMON_ACTION_TYPE.CHANGE_WIDTH_AND_HEIGHT]: (state: appStateType, action) =>
    {
        let nextState: appStateType = deepCopy(state);
        nextState.width = action.newWidth;
        nextState.height = action.newHeight;
        return nextState;
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
    [APP_ACTION_TYPE.APP_ACTION_UPDATE_APP_PERSPECTIVE]: (state: appStateType, action) =>
    {
        let nextState: appStateType = deepCopy(state);
        nextState.perspective = action.newPerspective;
        return nextState;
    },
};

export default createReducer(appDefaultState, appReducerHandlers);
