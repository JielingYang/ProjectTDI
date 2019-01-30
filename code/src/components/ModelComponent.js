import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LEVEL3_CONSOLE_FONT, LEVEL3_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import type {modelStateType} from "../reducers/modelReducer";
import StyleObject, {STYLE_OBJECT_INITIAL_TYPE} from "../classes/StyleObject";
import TopFrontFace from "../images/top_front_face.png";
import TopLeftFace from "../images/top_left_face.png";
import TopRightFace from "../images/top_right_face.png";
import MidFrontFace from "../images/mid_front_face.png";
import MidLeftFace from "../images/mid_left_face.png";
import MidRightFace from "../images/mid_right_face.png";
import BottomFrontFace from "../images/bottom_front_face.png";
import BottomLeftFace from "../images/bottom_left_face.png";
import BottomRightFace from "../images/bottom_right_face.png";
import {modelAction_requestToSetIsMouseOver} from "../actions/modelActions";

type ModelComponentPropsType = {
    /* Values from parent */
    modelIndex: number,
    model: modelStateType,
    numberOfModels: number,
    mouseOverModelIndex: number,
    /* Values from mapStateToProps() */
    /* Functions from matchDispatchToProps() */
    modelAction_requestToSetIsMouseOver: Function
}

const ModelComponent = (props: ModelComponentPropsType) =>
{
    let modelIndex: number = props.modelIndex;
    let model: modelStateType = props.model;
    let mouseOverModelIndex: number = props.mouseOverModelIndex;
    let isMouseOver: boolean = model.isMouseOver;
    let isSelected: boolean = model.isSelected;
    let numberOfModels: number = props.numberOfModels;
    let isTopModel: boolean = modelIndex === 0;
    let isBottomModel: boolean = modelIndex + 1 === numberOfModels;
    let sideFacesTranslationZ: number = model.width / 2;
    let blurValue: number = mouseOverModelIndex >= 0
                            ? Math.abs(mouseOverModelIndex - modelIndex) * 0.9
                            : 0;
    let frontFaceUrl: string = isTopModel
                               ? TopFrontFace
                               : isBottomModel
                                 ? BottomFrontFace
                                 : MidFrontFace;
    let leftFaceUrl: string = isTopModel
                              ? TopLeftFace
                              : isBottomModel
                                ? BottomLeftFace
                                : MidLeftFace;
    let rightFaceUrl: string = isTopModel
                               ? TopRightFace
                               : isBottomModel
                                 ? BottomRightFace
                                 : MidRightFace;

    let modelStyleObject: StyleObject = new StyleObject(STYLE_OBJECT_INITIAL_TYPE.DEFAULT)
        .setBasics(model.width, model.height, model.left, model.top)
        // .setBorder(1, "solid", "rgba(0,0,0,1)")
        .setTransformStyle("preserve-3d")
        .setPointerEvents("none");

    let modelSideFacesStyleObject: StyleObject = new StyleObject(STYLE_OBJECT_INITIAL_TYPE.DEFAULT)
        .setBasics(model.width, model.height, 0, 0)
        // .setBorder(1, "solid", "rgba(255,0,0,1)")
        .setBackgroundSize("100% 100%")
        .setTransformStyle("preserve-3d")
        .setBackfaceVisibility("hidden")
        .setBlur(blurValue)
        .addTransition("filter", 0.2)
        .setPointerEvents("auto");


    let modelFrontFacesStyleObject: StyleObject = modelSideFacesStyleObject
        .clone()
        .setBackgroundImage(frontFaceUrl)
        .addTranslationZ(sideFacesTranslationZ);
    let modelLeftFacesStyleObject: StyleObject = modelSideFacesStyleObject
        .clone()
        .setBackgroundImage(leftFaceUrl)
        .addRotationY(-90)
        .addTranslationZ(sideFacesTranslationZ);
    let modelRightFacesStyleObject: StyleObject = modelSideFacesStyleObject
        .clone()
        .setBackgroundImage(rightFaceUrl)
        .addRotationY(90)
        .addTranslationZ(sideFacesTranslationZ);

    console.log(LEVEL3_CONSOLE_PREFIX + model.reducerName + modelIndex, LEVEL3_CONSOLE_FONT);
    return <div style={modelStyleObject.getStyle()}>
        <div style={modelLeftFacesStyleObject.getStyle()}
             onMouseEnter={() => props.modelAction_requestToSetIsMouseOver(true, modelIndex)}/>
        <div style={modelRightFacesStyleObject.getStyle()}
             onMouseEnter={() => props.modelAction_requestToSetIsMouseOver(true, modelIndex)}/>
        <div style={modelFrontFacesStyleObject.getStyle()}
             onMouseEnter={() => props.modelAction_requestToSetIsMouseOver(true, modelIndex)}/>
    </div>;
};

const mapStateToProps = () =>
{
    return {};
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        modelAction_requestToSetIsMouseOver: modelAction_requestToSetIsMouseOver,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ModelComponent);
