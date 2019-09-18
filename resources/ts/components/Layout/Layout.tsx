import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import withStyles from "@material-ui/styles/withStyles";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";

import { AppState } from "../../rootReducer";
import { IAuthControllerState } from "../../store/AuthController/types";
import {
    changeCategoryMenu,
    fetchCategories
} from "../../store/Layout/actions";
import { IHeaderSubCategory, ILayoutState } from "../../store/Layout/types";
import Snacks from "./Snacks";

const styler = withStyles((theme: Theme) => ({
    brandName: {
        marginLeft: theme.spacing(2)
    },
    categoryBlock: {
        margin: theme.spacing(2),
        marginBottom:0,
        marginTop:0,
    },
    categoryLink: {
        color: theme.palette.text.primary + "!important",
        fontSize: ".7em",
        paddingRight: theme.spacing(2),
        textDecoration: "none!important"
    },
    categoryTab:{
        fontSize:".6em"
    },
    content: {
        paddingTop: theme.spacing(7)
    },
    grow: {
        flexGrow: 1
    },
    header: {
        borderBottom: "solid 1px " + theme.palette.secondary.dark
    },
    headerButton: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}));

interface IProps {
    children: JSX.Element[] | JSX.Element | string;
    classes: {
        brandName: string;
        categoryBlock: string;
        categoryTab: string;
        grow: string;
        header: string;
        categoryLink: string;
        content: string;
        headerButton: string;
    };
    onChangeCategoryMenu: (menuId: number) => void;
    onLoadCategories: () => void;
}

const mapStateToProps = (state: AppState) => ({
    ...state.layout,
    ...state.authController
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onChangeCategoryMenu: (menuId: number) =>
        dispatch(changeCategoryMenu(menuId)),
    onLoadCategories: () => dispatch(fetchCategories())
});

class Layout extends React.Component<
    IProps & ILayoutState & IAuthControllerState
> {
    constructor(props: IProps & ILayoutState & IAuthControllerState) {
        super(props);

        props.onLoadCategories();
        this.handleChangeSidebarMenu = this.handleChangeSidebarMenu.bind(this);
        this.handleHideCategoryMenu = this.handleHideCategoryMenu.bind(this);
    }

    public render() {
        const {
            children,
            classes,
            categories,
            user,
            activeCategoryMenu
        } = this.props;

        return (
            <div>
                <AppBar
                    position="fixed"
                    className={classes.header}
                    color="primary"
                >
                    <Toolbar variant="dense">
                        <img src="/images/logo.png" width="38" />
                        <Typography className={classes.brandName} variant="h5">
                            Printomatic
                        </Typography>
                        <div className={classes.grow} />
                        <Button className={classes.headerButton} size="small">
                            Start Designing
                        </Button>
                        {user ? null : (
                            <Link to="/#loginForm">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </Toolbar>
                </AppBar>
                <div className={classes.content}>
                    <ClickAwayListener
                        onClickAway={this.handleHideCategoryMenu}
                    >
                        <div>
                            <Tabs
                                onChange={this.handleChangeSidebarMenu}
                                value={activeCategoryMenu}
                            >
                                {categories.map((category, key) => (
                                    <Tab
                                        textColor="primary"
                                        key={key}
                                        value={key}
                                        label={category.title}
                                        className={classes.categoryTab}
                                    />
                                ))}
                                <Tab
                                    textColor="primary"
                                    className={classes.categoryTab}
                                    value={-1}
                                    label={
                                        activeCategoryMenu !== -1
                                            ? (
                                                <CloseIcon />
                                            )
                                            : undefined
                                    }
                                />
                            </Tabs>
                            <Collapse
                                in={activeCategoryMenu !== -1}
                                timeout="auto"
                                unmountOnExit={true}
                            >
                                <Grid container={true}>
                                    {this.renderSubCategories(
                                        categories[activeCategoryMenu]
                                            ? categories[activeCategoryMenu]
                                                  .subCategories
                                            : undefined
                                    )}
                                </Grid>
                            </Collapse>
                        </div>
                    </ClickAwayListener>
                    {children}
                </div>
                <Snacks />
            </div>
        );
    }

    public renderSubCategories(subCats?: IHeaderSubCategory[]) {
        if (!subCats) {
            return null;
        }

        const { classes } = this.props;

        let i: number;
        let j: number;
        let temparray: IHeaderSubCategory[];
        const chunk = 4;
        j = subCats.length;

        const grids: JSX.Element[] = [];

        for (i = 0; i < j; i += chunk) {
            temparray = subCats.slice(i, i + chunk);

            grids.push(
                <Grid
                    className={classes.categoryBlock}
                    key={i}
                    md={3}
                    xs={12}
                    item={true}
                >
                    <List dense={true}>
                        {temparray.map((subCat, key) => (
                            <ListItem divider={true} button={true} key={key}>
                                <ListItemText primary={subCat.title} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            );
        }

        return grids;
    }

    private handleChangeSidebarMenu(e: React.ChangeEvent<{}>, value: number) {
        const { onChangeCategoryMenu } = this.props;

        onChangeCategoryMenu(value);
    }

    private handleHideCategoryMenu() {
        const { onChangeCategoryMenu } = this.props;

        onChangeCategoryMenu(-1);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(Layout));
