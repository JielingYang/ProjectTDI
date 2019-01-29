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

type ModelComponentPropsType = {
    /* Values from parent */
    modelIndex: number,
    model: modelStateType,
    numberOfModels: number,
    /* Values from mapStateToProps() */
}

const ModelComponent = (props: ModelComponentPropsType) =>
{
    let modelIndex = props.modelIndex;
    let model = props.model;
    let numberOfModels = props.numberOfModels;

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
        .setPointerEvents("none");

    let isTopModel: boolean = modelIndex === 0;
    let isBottomModel: boolean = modelIndex + 1 === numberOfModels;
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

    let sideFacesTranslationZ: number = model.width / 2;
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
    let modelTopFaceStyleObject: StyleObject = modelSideFacesStyleObject
        .clone()
        .setBackgroundColor("black")
        .setHeight(model.width)
        .setTop(-model.width / 2)
        .addRotationX(90);
    let modelBottomFaceStyleObject: StyleObject = modelTopFaceStyleObject
        .clone()
        .setBottom(-(model.width / 2 + 1))
        .addRotationX(-180);

    console.log(LEVEL3_CONSOLE_PREFIX + model.reducerName + modelIndex, LEVEL3_CONSOLE_FONT);
    return <div style={modelStyleObject.getStyle()}>
        <div style={modelLeftFacesStyleObject.getStyle()}/>
        <div style={modelRightFacesStyleObject.getStyle()}/>
        <div style={modelFrontFacesStyleObject.getStyle()}/>
        {isTopModel
         ? <div style={modelTopFaceStyleObject.getStyle()}/>
         : null}
        {isBottomModel
         ? <div style={modelBottomFaceStyleObject.getStyle()}/>
         : null}
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
