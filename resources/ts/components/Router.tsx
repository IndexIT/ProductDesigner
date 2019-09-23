import { createBrowserHistory } from "history";
import * as React from "react";
import { connect } from "react-redux";
import {Route,Router as ReactRouter} from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../rootReducer";
import { fetchUser } from "../store/AuthController/actions";
import { IAuthControllerState } from "../store/AuthController/types";
import DesignerPage from "./DesignerPage/DesignerPage";
import HomePage from "./HomePage/HomePage";

const mapStateToProps = (state: AppState) => ({
    ...state.authController
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onFetchLoggedUser: () => dispatch(fetchUser())
});

interface IProps extends IAuthControllerState {
    onFetchLoggedUser: () => void;
}

const history = createBrowserHistory();

class Router extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        props.onFetchLoggedUser();
    }

    public render() {
        const { loading } = this.props;

        if (loading) {
            return <div>loading</div>;
        }

        return (
            <ReactRouter history={history} >
                <Route path="/" exact={true} component={HomePage}  /> 
                <Route path="/designer" exact={true} component={DesignerPage} />
            </ReactRouter>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router);
