import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FavouriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import withStyles from "@material-ui/styles/withStyles";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../rootReducer";
import { IAuthControllerState } from "../../store/AuthController/types";
import {
    changeForm,
    fetchAnimals,
    fetchCategories,
    hideAnimals
} from "../../store/HomePage/actions";
import { HomePageForms, IHomePageState } from "../../store/HomePage/types";
import IconTextField from "../Common/IconTextField";
import Layout from "../Layout/Layout";
import LoginForm from "./LoginForm";
import ProductRow from "./ProductRow";
import RegisterForm from "./RegisterForm";

const styler = withStyles((theme: Theme) => ({
    animalList: {
        left:0,
        marginLeft:"auto",
        marginRight: "auto",
        maxWidth:400,
        position: "absolute",
        right:0,
        top: theme.spacing(7),
        width: "100%",
    },
    animalPicker: {
        position: "relative",
    },
    blackIcon: {
        color: theme.palette.text.primary
    },
    breadcrumb: {
        background: "url(/images/wallpaper.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        color: theme.palette.text.primary
    },
    breadcrumbLeftGrid: {
        padding: theme.spacing(2)
    },
    breadcrumbRightGrid: {
        background: "rgba(25,25,25,0.9)",
        minHeight: 380,
        padding: theme.spacing(2),
        transitionDuration: ".1s"
    },
    breadcrumbTitle: {
        color: theme.palette.common.white,
        fontWeight: 900,
        marginTop: theme.spacing(10),
        paddingLeft: theme.spacing(2),
        textShadow: "2px 2px 4px rgba(0,0,0,0.7)"
    },
    grow: {
        flexGrow: 1
    },
    iconTextField: {
        margin: "auto",
        marginTop: theme.spacing(4)
    },
    loginFormWrapper: {
        color: theme.palette.common.white,
        maxWidth: 440
    },
    redIcon: {
        color: red[400]
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
        animalList: string;
        animalPicker: string;
        blackIcon: string;
        breadcrumb: string;
        breadcrumbLeftGrid: string;
        breadcrumbRightGrid: string;
        breadcrumbTitle: string;
        grow: string;
        iconTextField: string;
        loginFormWrapper: string;
        thirdBreadcrumb: string;
        redIcon: string;
    };
    onChangeForm: (e: React.ChangeEvent<{}>, form: HomePageForms) => void;
    onDataLoad: () => void;
    onHideAnimalList:()=> void;
    onSearchAnimals: (keyword: string | number | undefined) => void;
}

const mapStateToProps = (state: AppState) => ({
    ...state.homePage
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onChangeForm: (e: React.ChangeEvent<{}>, form: HomePageForms) =>
        dispatch(changeForm(form)),
    onDataLoad: () => dispatch(fetchCategories()),
    onHideAnimalList:()=>dispatch(hideAnimals()),
    onSearchAnimals: (keyword: string | number | undefined) =>
        dispatch(fetchAnimals(keyword as string))
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
            user,
            animals,
            onSearchAnimals,
            onHideAnimalList
        } = this.props;

        return (
            <div>
                <Layout>
                    <div className={classes.breadcrumb}>
                        <Grid container={true}>
                            <Grid
                                className={classes.breadcrumbLeftGrid}
                                item={true}
                                md={6}
                            >
                                <Typography
                                    className={classes.breadcrumbTitle}
                                    align="left"
                                    variant="h3"
                                >
                                    Title 1
                                </Typography>
                                <div className={classes.animalPicker}>
                                    <IconTextField
                                        label="What is your favourite animal?"
                                        leftIcon={
                                            <FavouriteIcon
                                                className={classes.redIcon}
                                            />
                                        }
                                        rightIcon={
                                            <SearchIcon
                                                className={classes.blackIcon}
                                            />
                                        }
                                        className={classes.iconTextField}
                                        onChange={onSearchAnimals}
                                        inputProps={{
                                            onBlur:onHideAnimalList
                                        }}
                                    />
                                    {animals.length ? (
                                        <Paper className={classes.animalList}>
                                            <List>
                                                {animals.map((animal, key) => (
                                                    <ListItem
                                                        divider={true}
                                                        button={true}
                                                        key={key}
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                animal.name
                                                            }
                                                        />
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                src={
                                                                    "storage/animals/64" +
                                                                    animal.image
                                                                }
                                                            />
                                                        </ListItemAvatar>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Paper>
                                    ) : null}
                                </div>
                            </Grid>
                            <Grid
                                className={classes.breadcrumbRightGrid}
                                item={true}
                                md={6}
                            >
                                <div className={classes.loginFormWrapper}>
                                    {user ? null : (
                                        <Tabs
                                            onChange={onChangeForm}
                                            value={form}
                                        >
                                            <Tab
                                                label="Login"
                                                value="login"
                                                title="Click here to register your credentials."
                                                color="inherit"
                                            />
                                            <Tab
                                                label="Signup"
                                                value="signup"
                                                title="Click here to register as a new user."
                                                color="inherit"
                                            />
                                        </Tabs>
                                    )}
                                    {this.renderForm()}
                                </div>
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
