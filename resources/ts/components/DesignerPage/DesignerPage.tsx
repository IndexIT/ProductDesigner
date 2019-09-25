import red from "@material-ui/core/colors/red";
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
import CloseIcon from "@material-ui/icons/Close";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import * as React from "react";
import { ColorResult, HuePicker } from "react-color";
import Moveable, { OnDrag, OnResize, OnRotate } from "react-moveable";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../rootReducer";
import {
    addItem,
    changeColor,
    changeCurrentColor,
    changePosition,
    changeRotate,
    changeSize,
    removeItem
} from "../../store/DesignerPage/actions";
import {
    DesignerItemType,
    IDesignerState,
    IDesignImage
} from "../../store/DesignerPage/types";
import Layout from "../Layout/Layout";

const styler = withStyles((theme: Theme) => ({
    canvas: {
        height: "100%",
        margin: "auto",
        maxHeight: 600,
        maxWidth: 600,
        minHeight: 360,
        minWidth: 360,
        width: "100%"
    },
    closeIcon: {
        "&:hover":{
            color: red[600]
        },
        background: theme.palette.common.white,
        borderRadius: "100%",
        color: red[400],
        cursor: "pointer",
        float: "right",
        height: ".6em",
        marginRight: ".2em",
        marginTop: ".2em",
        width: ".6em"
    },
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
        maxWidth: 54,
        padding: theme.spacing(1),
        paddingBottom: 0,
        paddingTop: 0,
        position: "absolute"
    },
    item: {
        position: "absolute"
    },
    modal: {
        left: `55%`,
        maxWidth: 400,
        position: "absolute",
        top: `55%`,
        transform: `translate(-55%, -55%)`
    },
    wrapper: {
        background: theme.palette.grey[300],
        minHeight: 400,
        paddingLeft: 54,
        position: "relative"
    }
}));

const mapStateToProps = (state: AppState) => ({
    ...state.designerPage
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onAddItem: (item: DesignerItemType) => dispatch(addItem(item)),
    onChangeColor: (itemId: number, color: string) =>
        dispatch(changeColor(itemId, color)),
    onChangeCurrentColor: (color: string) =>
        dispatch(changeCurrentColor(color)),
    onMove: (itemId: number, left: number, top: number) =>
        dispatch(changePosition(itemId, left, top)),
    onRemoveItem: (itemId:number)=>dispatch(removeItem(itemId)),
    onResize: (itemId: number, width: number, height: number) =>
        dispatch(changeSize(itemId, width, height)),
    onRotate: (itemId: number, rotate: number) =>
        dispatch(changeRotate(itemId, rotate))
});

interface IState {
    target?: HTMLElement | SVGElement;
    selectedItem?: DesignerItemType;
}

interface IProps extends IDesignerState {
    classes: {
        canvas: string;
        closeIcon: string;
        colorPicker: string;
        item: string;
        drawer: string;
        modal: string;
        wrapper: string;
    };
    onAddItem: (item: DesignerItemType) => void;
    onToggleImageModal: (open: boolean) => void;
    onMove: (itemId: number, left: number, top: number) => void;
    onRemoveItem: (itemId:number)=> void;
    onResize: (itemId: number, width: number, height: number) => void;
    onRotate: (itemId: number, rotate: number) => void;
    onChangeColor: (itemId: number, color: string) => void;
    onChangeCurrentColor: (color: string) => void;
}

class DesignerPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {};

        this.handleOpenImageModel = this.handleOpenImageModel.bind(this);
        this.handleSelectElement = this.handleSelectElement.bind(this);
        this.handleChangeImageInput = this.handleChangeImageInput.bind(this);
        this.handleClickSquareButton = this.handleClickSquareButton.bind(this);
        this.handleClickCircleButton = this.handleClickCircleButton.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleClickRemoveIcon = this.handleClickRemoveIcon.bind(this);
    }

    public render() {
        const { classes, items, color } = this.props;
        const { target, selectedItem } = this.state;

        return (
            <Layout>
                <Modal onClose={this.handleCloseImageModal} open={false}>
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
                        <label>
                            <input
                                onChange={this.handleChangeImageInput}
                                style={{ display: "none" }}
                                type="file"
                                name="imageUploader"
                                id="imageUploader"
                            />
                            <Tooltip title="Add Photo">
                                <IconButton
                                    onClick={this.handleClickImageButton}
                                    size="small"
                                >
                                    <AddPhotoAlternateIcon />
                                </IconButton>
                            </Tooltip>
                        </label>
                        <Divider />
                        <Tooltip title="Brush">
                            <IconButton size="small">
                                <BrushIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip title="Add a circle">
                            <IconButton
                                onClick={this.handleClickCircleButton}
                                size="small"
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip title="Add a rectangle">
                            <IconButton
                                onClick={this.handleClickSquareButton}
                                size="small"
                            >
                                <AddBoxIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider />
                        <Tooltip onClick={this.handleClickLineButton} title="Draw a line">
                            <IconButton size="small">
                                <ShowChartIcon />
                            </IconButton>
                        </Tooltip>
                        <Divider />
                    </Drawer>
                    <div className={classes.canvas} id="canvas">
                        {Object.values(items).map((item, key) =>
                            this.renderItem(item, key)
                        )}
                    </div>

                    <div>
                        {Object.values(items).map((item, key) => (
                            <Moveable
                                key={key}
                                container={document.getElementById("canvas")}
                                target={
                                    selectedItem &&
                                    selectedItem.itemId === item.itemId
                                        ? target
                                        : null
                                }
                                keepRatio={false}
                                origin={true}
                                draggable={true}
                                snappable={true}
                                transformOrigin="% %"
                                verticalGuidelines={[100, 200, 400, 500]}
                                horizontalGuidelines={[100, 200, 400, 500]}
                                snapCenter={true}
                                resizable={true}
                                throttleDrag={0}
                                throttleResize={1}
                                throttleRotate={1}
                                rotatable={true}
                                onDrag={this.handleDrag(item.itemId)}
                                onResize={this.handleResize(item)}
                                onRotate={this.handleRotate(item.itemId)}
                            />
                        ))}
                    </div>
                    <Toolbar variant="dense" className={classes.colorPicker}>
                        <HuePicker
                            onChange={this.handleChangeColor}
                            color={color}
                            width="100%"
                        />
                    </Toolbar>
                </div>
            </Layout>
        );
    }

    public renderItem(item: DesignerItemType, key: number) {
        const { classes } = this.props;
        const {selectedItem} = this.state;

        const styles: React.CSSProperties = {};

        const heightScale = item.height / item.originalHeight;
        const widthScale = item.width / item.originalWidth;

        const scale = heightScale > widthScale ? heightScale : widthScale;

        switch (item.type) {
            case "image":
                styles.backgroundImage =
                    "url(" + (item as IDesignImage).src + ")";
                styles.backgroundSize = "100% 100%";
                styles.backgroundPosition = "center";
                break;
            case "square":
                styles.background = "transparent";
                styles.border =
                    "solid " + Math.round(4 * scale) + "px " + item.color;
                break;
            case "circle":
                styles.background = "transparent";
                styles.border =
                    "solid " + Math.round(4 * scale) + "px " + item.color;
                styles.borderRadius = "100%";
                break;
            default:
                break;
        }

        return (
            <div
                key={key}
                onClick={this.handleSelectElement(item)}
                className={classes.item}
                id={"item" + item.itemId}
                style={{
                    background: item.color,
                    height: item.height,
                    left: item.left,
                    top: item.top,
                    transform: "rotate(" + item.rotate + "deg)",
                    width: item.width,
                    ...styles
                }}
            >
                {selectedItem&&selectedItem.itemId===item.itemId?
                    <CloseIcon onClick={this.handleClickRemoveIcon} className={classes.closeIcon} />
                :null}
            </div>
        );
    }

    private handleOpenImageModel() {
        const { onToggleImageModal } = this.props;

        onToggleImageModal(true);
    }

    private handleChangeColor(color: ColorResult) {
        const { selectedItem } = this.state;

        if (selectedItem) {
            this.props.onChangeColor(selectedItem.itemId, color.hex);
        } else {
            this.props.onChangeCurrentColor(color.hex);
        }
    }

    private handleChangeImageInput(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;

        if (files && files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);

            e.target.value = "";

            reader.onload = () => {
                const result = reader.result;
                const img = new Image();

                img.src = result as string;

                img.onload = () => {
                    const naturalWidth = img.naturalWidth;
                    const naturalHeight = img.naturalHeight;

                    let width = 0;
                    let height = 0;

                    if (naturalHeight > naturalWidth) {
                        height = 100;
                        width = Math.round(
                            (100 / naturalHeight) * naturalWidth
                        );
                    } else if (naturalWidth > naturalHeight) {
                        width = 100;
                        height = Math.round(
                            (100 / naturalWidth) * naturalHeight
                        );
                    } else {
                        width = 100;
                        height = 100;
                    }

                    this.props.onAddItem({
                        color: this.props.color,
                        flipHorizontal: false,
                        flipVertical: false,
                        height,
                        itemId: 0,
                        left: 100,
                        originalHeight: naturalHeight,
                        originalWidth: naturalWidth,
                        rotate: 0,
                        src: reader.result as string,
                        top: 100,
                        type: "image",
                        width
                    });
                };
            };
        }
    }

    private handleClickImageButton(e: React.MouseEvent<HTMLElement>) {
        e.currentTarget.parentElement!.click();
    }

    private handleClickRemoveIcon(){
        const {selectedItem} = this.state;
        const {onRemoveItem} = this.props;

        if(selectedItem){
            onRemoveItem(selectedItem.itemId);

            this.setState({
                selectedItem:undefined,
                target: undefined
            });
        }
    }

    private handleClickLineButton(){
        // this.props.onAddItem({
        //     color: this.props.color,
        //     flipHorizontal: false,
        //     flipVertical: false,
        //     height: 4,
        //     itemId: 0,
        //     left: 100,
        //     originalHeight: 100,
        //     originalWidth: 100,
        //     rotate: 0,
        //     top: 100,
        //     type: "line",
        //     width: 100
        // });
    }

    private handleClickSquareButton() {
        this.props.onAddItem({
            color: this.props.color,
            flipHorizontal: false,
            flipVertical: false,
            height: 100,
            itemId: 0,
            left: 100,
            originalHeight: 100,
            originalWidth: 100,
            rotate: 0,
            top: 100,
            type: "square",
            width: 100
        });
    }

    private handleClickCircleButton() {
        this.props.onAddItem({
            color: this.props.color,
            flipHorizontal: false,
            flipVertical: false,
            height: 100,
            itemId: 0,
            left: 100,
            originalHeight: 100,
            originalWidth: 100,
            rotate: 0,
            top: 100,
            type: "circle",
            width: 100
        });
    }

    private handleCloseImageModal() {
        const { onToggleImageModal } = this.props;

        onToggleImageModal(false);
    }

    private handleDrag(itemId: number) {
        return ({ top, left }: OnDrag) => {
            this.props.onMove(itemId, left, top);
        };
    }

    private handleResize(item: DesignerItemType) {
        return ({ width, height, delta, direction }: OnResize) => {
            this.props.onResize(item.itemId, width, height);

            let left = item.left;
            let top = item.top;

            if (direction[0] === -1) {
                left -= delta[0];
            }

            if (direction[1] === -1) {
                top -= delta[1];
            }

            this.props.onMove(item.itemId, left, top);
        };
    }

    private handleRotate(itemId: number) {
        return ({ rotate }: OnRotate) => {
            this.props.onRotate(itemId, rotate);
        };
    }

    private handleSelectElement(item: DesignerItemType) {
        return (e: React.MouseEvent<HTMLElement>) => {
            const { selectedItem } = this.state;

            if (selectedItem && selectedItem.itemId === item.itemId) {
                this.setState({
                    selectedItem: undefined,
                    target: undefined
                });
            } else {
                this.setState({
                    selectedItem: item,
                    target: e.currentTarget
                });
            }
        };
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(DesignerPage));
