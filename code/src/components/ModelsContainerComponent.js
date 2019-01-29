import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import type {modelsContainerStateType} from "../reducers/modelsContainerReducer";
import type {modelStateType} from "../reducers/modelReducer";
import {LEVEL1_CONSOLE_FONT, LEVEL1_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject, {STYLE_OBJECT_INITIAL_TYPE} from "../classes/StyleObject";
import ModelsAxisComponent from "./ModelsAxisComponent";

type ModelsContainerComponentPropsType = {
    /* Values from parent */
    /* Values from mapStateToProps() */
    modelsContainerState: modelsContainerStateType
}

const ModelsContainerComponent = (props: ModelsContainerComponentPropsType) =>
{
    let modelsContainerState: modelsContainerStateType = props.modelsContainerState;
    let models: Array<modelStateType> = modelsContainerState.allModels;

    let modelsContainerStyleObject: StyleObject = new StyleObject(STYLE_OBJECT_INITIAL_TYPE.DEFAULT)
        .setBasics(modelsContainerState.width, modelsContainerState.height, modelsContainerState.left, modelsContainerState.top)
        .setBackgroundColor("rgba(0,0,0,0.2)")
        .setPerspective(modelsContainerState.perspective)
        .setBoxSizing("border-box")
        .setPointerEvents("none");

    console.log(LEVEL1_CONSOLE_PREFIX + props.modelsContainerState.reducerName, LEVEL1_CONSOLE_FONT);
    return <div style={modelsContainerStyleObject.getStyle()}>
        <ModelsAxisComponent models={models}/>
    </div>
};

const mapStateToProps = (store) =>
{
    return {
        modelsContainerState: store.modelsContainerState,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ModelsContainerComponent);
