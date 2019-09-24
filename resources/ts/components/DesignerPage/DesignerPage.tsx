import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import BrushIcon from "@material-ui/icons/Brush";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import * as React from "react";
import { HuePicker } from "react-color";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../rootReducer";
import { toggleImageModel } from "../../store/DesignerPage/actions";
import { IDesignerState } from "../../store/DesignerPage/types";
import Layout from "../Layout/Layout";

const styler = withStyles((theme: Theme) => ({
    colorPicker: {
        bottom: 0,
        left: 0,
        margin: 0,
        minHeight: "unset",
        padding: 0,
        position: "absolute",
        width: "100%",
        zIndex: 5000
    },
    drawer: {
        background: theme.palette.grey[500],
        padding: theme.spacing(1),
        paddingBottom: 0,
        paddingTop: 0,
        position: "absolute"
    },
    modal: {
        left: `55%`,
        position: "absolute",
        top: `55%`,
        transform: `translate(-55%, -55%)`,
        width: 400
    },
    wrapper: {
        background: theme.palette.grey[300],
        minHeight: 400,
        position: "relative"
    }
}));

const mapStateToProps = (state: AppState) => ({
    ...state.designerPage
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onToggleImageModal: (open: boolean) => dispatch(toggleImageModel(open))
});

interface IProps extends IDesignerState {
    classes: {
        colorPicker: string;
        drawer: string;
        modal: string;
        wrapper: string;
    };
    onToggleImageModal: (open: boolean) => void;
}

class DesignerPage extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.handleOpenImageModel = this.handleOpenImageModel.bind(this);
    }

    public render() {
        const { classes, imageModelOpen } = this.props;

        return (
            <Layout>
                <Modal
                    onClose={this.handleCloseImageModal}
                    open={imageModelOpen}
                >
                    <Paper className={classes.modal}>
                        <Typography variant="h6" align="center">
                            Select Your Image
                        </Typography>
                        <Divider />
                    </Paper>
                </Modal>
                <div className={classes.wrapper}>
                    <Drawer
                        classes={{
                            paper: classes.drawer
                        }}
                        open={true}
                        variant="permanent"
                    >
                        <Tooltip title="Add Text">
                            <IconButton size="small">
                                <TextFormatIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip
                            onClick={this.handleOpenImageModel}
                            title="Add Photo"
                        >
                            <IconButton size="small">
                                <AddPhotoAlternateIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip title="Brush">
                            <IconButton size="small">
                                <BrushIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip title="Add a circle">
                            <IconButton size="small">
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip title="Add a rectangle">
                            <IconButton size="small">
                                <AddBoxIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip title="Draw a polyline">
                            <IconButton size="small">
                                <ShowChartIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider />
                    </Drawer>
                    <Toolbar variant="dense" className={classes.colorPicker}>
                        <HuePicker color="#404040" width="100%" />
                    </Toolbar>
                </div>
            </Layout>
        );
    }

    private handleOpenImageModel() {
        const { onToggleImageModal } = this.props;

        onToggleImageModal(true);
    }

    private handleCloseImageModal() {
        const { onToggleImageModal } = this.props;

        onToggleImageModal(false);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(DesignerPage));
