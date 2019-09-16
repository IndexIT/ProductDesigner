import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../rootReducer";
import { IAuthControllerState } from "../../store/AuthController/types";
import { changeForm, fetchCategories } from "../../store/HomePage/actions";
import { HomePageForms, IHomePageState } from "../../store/HomePage/types";
import Layout from "../Layout/Layout";
import LoginForm from "./LoginForm";
import ProductRow from "./ProductRow";
import RegisterForm from "./RegisterForm";

const styler = withStyles((theme: Theme) => ({
    breadcrumb: {
        background: "#7979ff",
        color: theme.palette.text.primary,
        padding: theme.spacing(1)
    },
    breadcrumbGrid: {
        padding: theme.spacing(2)
    },
    grow: {
        flexGrow: 1
    },
    screenshot: {
        display: "block",
        margin: "auto",
        marginTop: theme.spacing(2)
    },
    thirdBreadcrumb: {
        background: "#e45b5b",
        color: theme.palette.common.white,
        minHeight: 200,
        padding: theme.spacing(2)
    }
}));

interface IProps {
    classes: {
        breadcrumb: string;
        screenshot: string;
        breadcrumbGrid: string;
        grow: string;
        thirdBreadcrumb: string;
    };
    onChangeForm: (e: React.ChangeEvent<{}>, form: HomePageForms) => void;
    onDataLoad: () => void;
}

const mapStateToProps = (state: AppState) => ({
    ...state.homePage
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onChangeForm: (e: React.ChangeEvent<{}>, form: HomePageForms) =>
        dispatch(changeForm(form)),
    onDataLoad: () => dispatch(fetchCategories())
});

class HomePage extends React.Component<
    IProps & IHomePageState & IAuthControllerState
> {
    constructor(props: IProps & IHomePageState & IAuthControllerState) {
        super(props);

        props.onDataLoad();
    }

    public renderForm() {
        const { user, form } = this.props;

        if (user) {
            return null;
        } else if (form === "login") {
            return <LoginForm />;
        } else {
            return <RegisterForm />;
        }
    }

    public render() {
        const {
            classes,
            form,
            onChangeForm,
            recommended,
            featuredCollections,
            trendingCollections,
            staffPicks,
            user
        } = this.props;

        return (
            <div>
                <Layout>
                    <div className={classes.breadcrumb}>
                        <Grid container={true}>
                            <Grid
                                className={classes.breadcrumbGrid}
                                item={true}
                                md={6}
                            >
                                <Typography align="center" variant="h6">
                                    Title 1
                                </Typography>
                                <Divider />
                                <Typography align="justify" variant="caption">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Maecenas mollis velit a
                                    odio aliquam, eu aliquet nisl consequat.
                                    Nunc sed felis nunc. Curabitur quis nisl at
                                    dolor suscipit aliquam. Sed in lacinia ante.
                                </Typography>
                                <img
                                    className={classes.screenshot}
                                    width="60%"
                                    src="/images/screenshots/1.png"
                                />
                            </Grid>
                            <Grid
                                className={classes.breadcrumbGrid}
                                item={true}
                                md={5}
                            >
                                {user ? null : (
                                    <Tabs onChange={onChangeForm} value={form}>
                                        <Tab
                                            label="Login"
                                            value="login"
                                            title="Click here to register your credentials."
                                            color="textSecondary"
                                        />
                                        <Tab
                                            label="Signup"
                                            value="signup"
                                            title="Click here to register as a new user."
                                            color="textSecondary"
                                        />
                                    </Tabs>
                                )}
                                {this.renderForm()}
                            </Grid>
                        </Grid>
                    </div>
                    <ProductRow
                        type="product"
                        label="Recommended for you.."
                        products={recommended}
                    />
                    <ProductRow
                        type="product"
                        label="Staff Picks"
                        products={staffPicks}
                    />
                    <ProductRow
                        type="collection"
                        label="Featured Collections"
                        products={featuredCollections}
                    />
                    <div>
                        {trendingCollections.map((collection, key) => (
                            <ProductRow
                                type="product"
                                key={key}
                                label={collection.name}
                                products={
                                    collection.products
                                        ? collection.products
                                        : []
                                }
                            />
                        ))}
                    </div>
                    <div className={classes.thirdBreadcrumb}>
                        <Grid container={true}>
                            <Grid item={true} md={4}>
                                Youtube video here
                            </Grid>
                            <Grid item={true} md={6}>
                                <Typography color="inherit" variant="h6">
                                    How to make your own product?
                                </Typography>
                                <Divider />

                                <Typography
                                    color="inherit"
                                    align="justify"
                                    variant="caption"
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Maecenas mollis velit a
                                    odio aliquam, eu aliquet nisl consequat.
                                    Nunc sed felis nunc. Curabitur quis nisl at
                                    dolor suscipit aliquam. Sed in lacinia ante.
                                </Typography>
                                <Toolbar variant="dense">
                                    <div className={classes.grow} />
                                    <Button variant="outlined" size="large">
                                        Learn More
                                    </Button>
                                </Toolbar>
                            </Grid>
                        </Grid>
                    </div>
                </Layout>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(HomePage));
