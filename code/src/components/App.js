import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {commonAction_changeLeftAndTop, commonAction_changeWidthAndHeight} from "../actions/commonActions";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";
import {LEVEL0_CONSOLE_FONT, LEVEL0_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject, {STYLE_OBJECT_INITIAL_TYPE} from "../classes/StyleObject";
import type {appStateType} from "../reducers/appReducer";
import {appAction_requestToUpdateAppMouseMoveRelatedData} from "../actions/appActions";
import {modelsContainerAction_addModel, modelsContainerAction_requestToUpdateModelsContainerPerspective} from "../actions/modelsContainerActions";
import ModelsContainerComponent from "./ModelsContainerComponent";
import {getViewportMin} from "../utilities/UTILITIES";
import {modelsAxisAction_requestToUpdateAxisWidthAndHeight} from "../actions/modelsAxisActions";

type AppPropsType = {
    /* Values from mapStateToProps() */
    appWidth: number,
    appHeight: number,
    appLeft: number,
    appTop: number,
    /* Functions from matchDispatchToProps() */
    commonAction_changeWidthAndHeight: Function,
    commonAction_changeLeftAndTop: Function,
    appAction_requestToUpdateAppMouseMoveRelatedData: Function,
    modelsContainerAction_requestToUpdateModelsContainerPerspective: Function,
    modelsContainerAction_addModel: Function,
    modelsAxisAction_requestToUpdateAxisWidthAndHeight: Function,
}

/**
 * App component is a class component (stateful component)
 * It uses React lifecycle function componentDidMount() and componentWillUnmount() to register/remove functions on window events
 */
class App extends Component<AppPropsType>
{
    constructor(props)
    {
        console.log(LEVEL0_CONSOLE_PREFIX + "App started", LEVEL0_CONSOLE_FONT);
        super(props);
        this.props = props;
    }

    componentDidMount()
    {
        this.props.modelsContainerAction_addModel();
        this.props.modelsContainerAction_addModel();

        this.appResize(this.props);

        console.log("Registering functions on window events...");
        window.addEventListener("resize", () => this.appResize(this.props));
        window.addEventListener("mousemove", (event) => this.props.appAction_requestToUpdateAppMouseMoveRelatedData(event.timeStamp, event.clientX, event.clientY));
        console.log("Done.");
    }

    componentWillUnmount()
    {
        console.log("Removing functions from window events...");
        window.removeEventListener("resize", () => this.appResize(this.props));
        window.removeEventListener("mousemove", (event) => this.props.appAction_requestToUpdateAppMouseMoveRelatedData(event.timeStamp, event.clientX, event.clientY));
        console.log("Done.");
    }

    render()
    {
        let appState: appStateType = this.props.appState;
        let appComponentStyleObject: StyleObject = new StyleObject(STYLE_OBJECT_INITIAL_TYPE.DEFAULT)
            .setBasics(appState.width, appState.height, appState.left, appState.top)
            .setBackgroundColor("rgb(255,0,0)")
            .setPointerEvents("auto");

        console.log(LEVEL0_CONSOLE_PREFIX + REDUCER_NAME.APP_REDUCER, LEVEL0_CONSOLE_FONT);
        return (
            <div style={appComponentStyleObject.getStyle()}>
                <ModelsContainerComponent/>
            </div>)
    }

    appResize(props)
    {
        let windowWidth: number = window.innerWidth;
        let windowHeight: number = window.innerHeight;
        let viewportMin: number = getViewportMin();
        let modelsAxisSize: number = viewportMin / 3;

        props.commonAction_changeWidthAndHeight(windowWidth, windowHeight, REDUCER_NAME.APP_REDUCER);

        props.commonAction_changeWidthAndHeight(windowWidth, windowHeight, REDUCER_NAME.MODELS_CONTAINER_REDUCER);
        props.modelsContainerAction_requestToUpdateModelsContainerPerspective();

        props.modelsAxisAction_requestToUpdateAxisWidthAndHeight(modelsAxisSize, modelsAxisSize);
        props.commonAction_changeLeftAndTop((windowWidth - modelsAxisSize) / 2, (windowHeight - modelsAxisSize) / 2, REDUCER_NAME.MODELS_AXIS_REDUCER);
    }
}

const mapStateToProps = (store) =>
{
    return {
        appState: store.appState
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        commonAction_changeWidthAndHeight: commonAction_changeWidthAndHeight,
        commonAction_changeLeftAndTop: commonAction_changeLeftAndTop,
        appAction_requestToUpdateAppMouseMoveRelatedData: appAction_requestToUpdateAppMouseMoveRelatedData,
        modelsContainerAction_addModel: modelsContainerAction_addModel,
        modelsContainerAction_requestToUpdateModelsContainerPerspective: modelsContainerAction_requestToUpdateModelsContainerPerspective,
        modelsAxisAction_requestToUpdateAxisWidthAndHeight: modelsAxisAction_requestToUpdateAxisWidthAndHeight,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
