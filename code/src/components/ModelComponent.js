import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LEVEL3_CONSOLE_FONT, LEVEL3_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import type {modelStateType} from "../reducers/modelReducer";
import StyleObject, {STYLE_OBJECT_INITIAL_TYPE} from "../classes/StyleObject";

type ModelComponentPropsType = {
    /* Values from parent */
    modelIndex: number,
    model: modelStateType,
    /* Values from mapStateToProps() */
}

const ModelComponent = (props: ModelComponentPropsType) =>
{
    let modelIndex = props.modelIndex;
    let model = props.model;

    let modelStyleObject: StyleObject = new StyleObject(STYLE_OBJECT_INITIAL_TYPE.DEFAULT)
        .setBasics(model.width, model.height, model.left, model.top)
        .setBorder(1, "solid", "rgba(0,225,255,0.1)")
        .setTransformStyle("preserve-3d")
        .setPointerEvents("none");

    let modelFacesStyleObject: StyleObject = new StyleObject(STYLE_OBJECT_INITIAL_TYPE.DEFAULT)
        .setBasics(model.width, model.height, 0, 0)
        .setBorder(1, "solid", "rgba(255,0,0,1)")
        .setTransformStyle("preserve-3d")
        .setPointerEvents("none");

    let translationZ: number = model.width / 2;
    let modelFrontFacesStyleObject: StyleObject = modelFacesStyleObject
        .clone()
        .addTranslationZ(translationZ);
    let modelLeftFacesStyleObject: StyleObject = modelFacesStyleObject
        .clone()
        .addRotationY(-90)
        .addTranslationZ(translationZ);
    let modelRightFacesStyleObject: StyleObject = modelFacesStyleObject
        .clone()
        .addRotationY(90)
        .addTranslationZ(translationZ);

    console.log(LEVEL3_CONSOLE_PREFIX + model.reducerName + modelIndex, LEVEL3_CONSOLE_FONT);
    return <div style={modelStyleObject.getStyle()}>
        <div style={modelLeftFacesStyleObject.getStyle()}/>
        <div style={modelRightFacesStyleObject.getStyle()}/>
        <div style={modelFrontFacesStyleObject.getStyle()}/>
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
