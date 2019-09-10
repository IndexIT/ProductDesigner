import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../rootReducer";
import { fetchUser } from "../store/AuthController/actions";
import { IAuthControllerState } from "../store/AuthController/types";
import Layout from "./Layout/Layout";

const mapStateToProps = (state: AppState) => ({
    ...state.authController
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onFetchLoggedUser: () => dispatch(fetchUser())
});

interface IProps extends IAuthControllerState {
    onFetchLoggedUser: () => void;
}

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
            <Layout>
                <div>kmkmk</div>
            </Layout>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router);
