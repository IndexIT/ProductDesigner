import AppBar from "@material-ui/core/AppBar";
import * as React from "react";
import {connect} from "react-redux";

import {AppState} from "../../rootReducer";
import { ILayoutState } from "../../store/Layout/types";

interface IProps extends ILayoutState {
    children: JSX.Element[] | JSX.Element | string;
}

const mapStateToProps = (state:AppState)=>({
    ...state.layout
});

class Layout extends React.Component<IProps> {
    public render() {
        const { children } = this.props;

        return (
            <div>
                <AppBar>jnjnja</AppBar>
                {children}
            </div>
        );
    }
}

export default connect(mapStateToProps) (Layout);
