import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {commonAction_changeWidthAndHeight} from "../actions/commonActions";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";
import {LEVEL0_CONSOLE_FONT, LEVEL0_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject, {STYLE_OBJECT_INITIAL_TYPE} from "../classes/StyleObject";
import type {appStateType} from "../reducers/appReducer";

type AppPropsType = {
    /* Values from mapStateToProps() */
    appWidth: number,
    appHeight: number,
    appLeft: number,
    appTop: number,
    /* Functions from matchDispatchToProps() */
    commonAction_changeWidthAndHeight: Function,
}

/**
 * App component is a class component (stateful component)
 * It uses React lifecycle function componentDidMount() and componentWillUnmount() to register/remove functions on window events
 */
class App extends Component<AppPropsType>
{
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    componentDidMount()
    {
        this.props.commonAction_changeWidthAndHeight(window.innerWidth, window.innerHeight, REDUCER_NAME.APP_REDUCER);

        console.log("Registering functions on window events...");
        window.addEventListener("resize", () => this.props.commonAction_changeWidthAndHeight(window.innerWidth, window.innerHeight, REDUCER_NAME.APP_REDUCER));
        console.log("Done.");
    }

    componentWillUnmount()
    {
        console.log("Removing functions from window events...");
        window.removeEventListener("resize", () => this.props.commonAction_changeWidthAndHeight(window.innerWidth, window.innerHeight, REDUCER_NAME.APP_REDUCER));
        console.log("Done.");
    }

    render()
    {
        let appState: appStateType = this.props.appState;
        let appComponentWrapperStyleObject = new StyleObject(STYLE_OBJECT_INITIAL_TYPE.DEFAULT)
            .setBasics("100%", "100%", 0, 0)
            .setBackgroundColor("rgb(255,0,0)")
            .setPointerEvents("none");
        let appComponentStyleObject = new StyleObject(STYLE_OBJECT_INITIAL_TYPE.DEFAULT)
            .setBasics(appState.width, appState.height, appState.left, appState.top)
            .setBackgroundColor("rgb(0,0,0)")
            .setPointerEvents("auto");

        console.log(LEVEL0_CONSOLE_PREFIX + REDUCER_NAME.APP_REDUCER, LEVEL0_CONSOLE_FONT);
        return (
            <div style={appComponentWrapperStyleObject.getStyle()}>
                <div style={appComponentStyleObject.getStyle()}>
                    App
                </div>
            </div>);
    }
}

const mapStateToProps = (store) =>
{
    return {
        appState: store.appState,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        commonAction_changeWidthAndHeight: commonAction_changeWidthAndHeight,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
