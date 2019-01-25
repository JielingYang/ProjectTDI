import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {commonAction_changeWidthAndHeight} from "../actions/commonActions";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";
import {LEVEL0_CONSOLE_FONT, LEVEL0_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject, {STYLE_OBJECT_INITIAL_TYPE} from "../classes/StyleObject";
import type {appStateType} from "../reducers/appReducer";
import {appAction_requestToUpdateAppMouseMoveRelatedData} from "../actions/appActions";
import {modelsContainerAction_addModel, modelsContainerAction_requestToUpdateModelsContainerPerspective} from "../actions/modelsContainerActions";
import ModelsContainerComponent from "./ModelsContainerComponent";

type AppPropsType = {
    /* Values from mapStateToProps() */
    appWidth: number,
    appHeight: number,
    appLeft: number,
    appTop: number,
    /* Functions from matchDispatchToProps() */
    commonAction_changeWidthAndHeight: Function,
    appAction_requestToUpdateAppMouseMoveRelatedData: Function,
    modelsContainerAction_requestToUpdateModelsContainerPerspective: Function,
    modelsContainerAction_addModel: Function,
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
        this.appResize(this.props);
        this.props.modelsContainerAction_addModel();
        this.props.modelsContainerAction_addModel();
        this.props.modelsContainerAction_addModel();
        this.props.commonAction_changeWidthAndHeight(1, 1, REDUCER_NAME.MODEL_REDUCER, 1);
        this.props.commonAction_changeWidthAndHeight(2, 2, REDUCER_NAME.MODEL_REDUCER, 2);

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
            .setBackgroundColor("rgb(255,255,0)")
            .setPointerEvents("auto");

        console.log(LEVEL0_CONSOLE_PREFIX + REDUCER_NAME.APP_REDUCER, LEVEL0_CONSOLE_FONT);
        return (
            <div style={appComponentStyleObject.getStyle()}>
                <ModelsContainerComponent/>
            </div>)
    }

    appResize(props)
    {
        props.commonAction_changeWidthAndHeight(window.innerWidth, window.innerHeight, REDUCER_NAME.APP_REDUCER);
        props.commonAction_changeWidthAndHeight(window.innerWidth, window.innerHeight, REDUCER_NAME.MODELS_CONTAINER_REDUCER);
        props.modelsContainerAction_requestToUpdateModelsContainerPerspective();
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
        appAction_requestToUpdateAppMouseMoveRelatedData: appAction_requestToUpdateAppMouseMoveRelatedData,
        modelsContainerAction_addModel: modelsContainerAction_addModel,
        modelsContainerAction_requestToUpdateModelsContainerPerspective: modelsContainerAction_requestToUpdateModelsContainerPerspective,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
