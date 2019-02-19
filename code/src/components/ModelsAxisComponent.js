import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject, {STYLE_OBJECT_INITIAL_TYPE} from "../classes/StyleObject";
import type {modelsAxisStateType} from "../reducers/modelsAxisReducer";
import type {modelStateType} from "../reducers/modelReducer";
import ModelComponent from "./ModelComponent";
import {DEFAULT_AXIS_ROTATION_X_VALUE} from "../utilities/CONSTANTS_NUMBER";

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
    let mouseOverModelIndex: number = models.findIndex((model: modelStateType, index: number) => model.isMouseOver);
    let modelsAxisRotationX: number = modelsAxisState.rotationX;
    let modelsAxisRotationY: number = DEFAULT_AXIS_ROTATION_X_VALUE + modelsAxisState.rotationY;

    let modelsAxisStyleObject: StyleObject = new StyleObject(STYLE_OBJECT_INITIAL_TYPE.DEFAULT)
        .setBasics(modelsAxisState.width, modelsAxisState.height, modelsAxisState.left, modelsAxisState.top)
        // .setBorder(1, "solid", "rgba(255,0,0,0.5)")
        // .addTranslationZ(200)
        .addRotationX(modelsAxisRotationX)
        .addRotationY(modelsAxisRotationY)
        .setTransformStyle("preserve-3d")
        .setPointerEvents("none");

    console.log(LEVEL2_CONSOLE_PREFIX + modelsAxisState.reducerName, LEVEL2_CONSOLE_FONT);
    return <div style={modelsAxisStyleObject.getStyle()}>
        {
            models.map((model: modelStateType, modelIndex: number) => <ModelComponent key={modelIndex}
                                                                                      model={model}
                                                                                      modelIndex={modelIndex}
                                                                                      numberOfModels={models.length}
                                                                                      mouseOverModelIndex={mouseOverModelIndex}
                                                                                      modelsAxisRotationX={modelsAxisRotationX}
                                                                                      modelsAxisRotationY={modelsAxisRotationY}/>)
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
