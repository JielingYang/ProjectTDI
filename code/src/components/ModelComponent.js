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
        .setBackgroundColor("rgba(0,0,0,0)")
        .setBorder(1, "solid", "rgba(255,0,0,0.5)")
        // .addRotationX()
        // .addRotationY()
        .setTransformStyle("preserve-3d")
        .setPointerEvents("none");

    let testStyleObject: StyleObject = new StyleObject(STYLE_OBJECT_INITIAL_TYPE.DEFAULT)
        .setBasics("100%", "100%", 0, 0)
        .setBackgroundColor("rgba(0,0,0,0)")
        .setBorder(1, "solid", "rgba(0,255,255,0.7)")
        .setTransformStyle("preserve-3d")
        .setPointerEvents("none");

    console.log(LEVEL3_CONSOLE_PREFIX + model.reducerName + modelIndex, LEVEL3_CONSOLE_FONT);
    return <div style={modelStyleObject.getStyle()}>
        <div style={testStyleObject.clone().addRotationY(90).getStyle()}>
            <div
                style={testStyleObject.clone().setBorder(1, "solid", "rgba(0,255,0,0.8)").addTranslationZ(150).getStyle()}>

                <div
                    style={testStyleObject.clone().setBorder(1, "solid", "rgba(0,255,0,0.8)").addTranslationZ(150).getStyle()}/>
            </div>
        </div>

        <div style={testStyleObject.clone().addRotationY(90).addTranslationZ(-150).getStyle()}/>
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
