import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import BrushIcon from "@material-ui/icons/Brush";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import * as React from "react";
import Layout from "../Layout/Layout";

const styler = withStyles((theme: Theme) => ({
    drawer: {
        background: theme.palette.grey[500],
        padding: theme.spacing(1),
        position: "absolute",
    },
    wrapper: {
        background: theme.palette.grey[300],
        minHeight: 400,
        position: "relative"
    }
}));

interface IProps {
    classes: {
        drawer: string;
        wrapper: string;
    };
}

class DesignerPage extends React.Component<IProps> {
    public render() {
        const { classes } = this.props;

        return (
            <Layout>
                <div className={classes.wrapper}>
                    <Drawer
                        classes={{
                            paper: classes.drawer
                        }}
                        open={true}
                        variant="permanent"
                    >
                        <Tooltip
                            title="Add Text"
                        >
                            <IconButton size="small" >
                                <TextFormatIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip
                            title="Add Photo"
                        >
                            <IconButton size="small" >
                                <AddPhotoAlternateIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip
                            title="Brush"
                        >
                            <IconButton size="small" >
                                <BrushIcon/>
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip
                            title="Add a circle"
                        >
                            <IconButton size="small" >
                                <AddCircleIcon/>
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip
                            title="Add a rectangle"
                        >
                            <IconButton size="small" >
                                <AddBoxIcon/>
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip
                            title="Draw a polyline"
                        >
                            <IconButton size="small" >
                                <ShowChartIcon/>
                            </IconButton>
                        </Tooltip>
                        <Divider />
                    </Drawer>
                </div>
            </Layout>
        );
    }
}

export default styler(DesignerPage);
