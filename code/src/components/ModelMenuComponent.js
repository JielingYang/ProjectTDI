import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LEVEL4_CONSOLE_FONT, LEVEL4_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";

type ModelComponentMenuPropsType = {
    /* Values from parent */
    /* Values from mapStateToProps() */
    /* Functions from matchDispatchToProps() */
}

const ModelMenuComponent = (props: ModelComponentMenuPropsType) =>
{

    console.log(LEVEL4_CONSOLE_PREFIX + model.reducerName + modelIndex, LEVEL4_CONSOLE_FONT);
    return <div>
    </div>
};

const mapStateToProps = () =>
{
    return {};
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ModelMenuComponent);
