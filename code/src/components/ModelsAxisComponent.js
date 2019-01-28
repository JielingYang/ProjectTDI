import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject, {STYLE_OBJECT_INITIAL_TYPE} from "../classes/StyleObject";
import type {modelsAxisStateType} from "../reducers/modelsAxisReducer";
import type {modelStateType} from "../reducers/modelReducer";
import ModelComponent from "./ModelComponent";

type ModelsAxisComponentPropsType = {
    /* Values from parent */
    models: Array<modelStateType>,
    /* Values from mapStateToProps() */
    modelsAxisState: modelsAxisStateType
}

const ModelsAxisComponent = (props: ModelsAxisComponentPropsType) =>
{
    let modelsAxisState: modelsAxisStateType = props.modelsAxisState;
    let models: Array<modelStateType> = props.models;

    let modelsAxisStyleObject: StyleObject = new StyleObject(STYLE_OBJECT_INITIAL_TYPE.DEFAULT)
        .setBasics(modelsAxisState.width, modelsAxisState.height, modelsAxisState.left, modelsAxisState.top)
        .setBorder(1, "solid", "rgba(255,0,0,0.1)")
        .addRotationX(modelsAxisState.rotationX)
        .addRotationY(modelsAxisState.rotationY)
        .setTransformStyle("preserve-3d")
        .setPointerEvents("none");

    console.log(LEVEL2_CONSOLE_PREFIX + modelsAxisState.reducerName, LEVEL2_CONSOLE_FONT);
    return <div style={modelsAxisStyleObject.getStyle()}>
        {
            models.map((model: modelStateType, modelIndex: number) => <ModelComponent key={modelIndex}
                                                                                      model={model}
                                                                                      modelIndex={modelIndex}/>)
        }
    </div>;
};

const mapStateToProps = (store) =>
{
    return {
        modelsAxisState: store.modelsAxisState,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ModelsAxisComponent);
