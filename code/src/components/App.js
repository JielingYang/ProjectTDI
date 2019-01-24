import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {commonAction_changeWidthAndHeight} from "../actions/commonActions";
import {REDUCER_NAME} from "../utilities/CONSTANTS_STRING";

type AppPropsType = {
    /* Values from mapStateToProps() */
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
        console.log("APP_COMPONENT")
        return (
            <div>
                App
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
