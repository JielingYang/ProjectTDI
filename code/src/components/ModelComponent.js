import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import type {modelStateType} from "../reducers/modelReducer";

type ModelComponentPropsType = {
    /* Values from parent */
    modelIndex: number,
    modelState: modelStateType
    /* Values from mapStateToProps() */
}

const ModelComponent = (props: ModelComponentPropsType) =>
{
    let modelIndex = props.modelIndex;
    let modelState = props.modelState;
    console.log(LEVEL2_CONSOLE_PREFIX + modelState.reducerName + modelIndex, LEVEL2_CONSOLE_FONT);
    return <div>
        model
    </div>;
};

const mapStateToProps = () =>
{
    return {};
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ModelComponent);
