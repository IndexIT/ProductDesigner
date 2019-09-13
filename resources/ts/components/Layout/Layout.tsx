import AppBar from "@material-ui/core/AppBar";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";

import { nameToURL } from "../../helper";
import { AppState } from "../../rootReducer";
import { fetchCategories } from "../../store/Layout/actions";
import { ILayoutState } from "../../store/Layout/types";

const styler = withStyles((theme: Theme) => ({
    brandName: {
        marginLeft: theme.spacing(2)
    },
    categoryLink: {
        color: theme.palette.text.primary + "!important",
        fontSize: ".7em",
        paddingRight: theme.spacing(2),
        textDecoration: "none!important"
    },
    content:{
        paddingTop: theme.spacing(5)
    },
    grow: {
        flexGrow: 1
    },
    header: {
        borderBottom: "solid 1px " + theme.palette.secondary.dark
    }
}));

interface IProps extends ILayoutState {
    children: JSX.Element[] | JSX.Element | string;
    classes: {
        brandName: string;
        grow: string;
        header: string;
        categoryLink: string;
        content: string;
    };
    onLoadCategories: () => void;
}

const mapStateToProps = (state: AppState) => ({
    ...state.layout
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onLoadCategories: () => dispatch(fetchCategories())
});

class Layout extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        props.onLoadCategories();
    }

    public render() {
        const { children, classes, categories } = this.props;

        return (
            <div>
                <AppBar position="fixed" className={classes.header} color="primary">
                    <Toolbar variant="dense">
                        <img src="/images/logo.png" width="38" />
                        <Typography className={classes.brandName} variant="h5">
                            Printomatic
                        </Typography>
                        <div className={classes.grow} />
                        {categories.map((category, key) => (
                            <Link
                                className={classes.categoryLink}
                                key={key}
                                to={
                                    "/category/" +
                                    category.id +
                                    "/" +
                                    nameToURL(category.title)
                                }
                            >
                                {category.title}
                            </Link>
                        ))}
                    </Toolbar>
                </AppBar>
                <div className={classes.content} >
                    {children}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(Layout));
