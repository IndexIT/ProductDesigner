import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import * as React from "react";

const styler = withStyles(() => ({
    divider: {
        height: 28,
        margin: 4,
        width: 1,
    },
    iconButton: {
        padding: 10
    },
    input: {
        flex: 1,
        marginLeft: 8,
    },
    root: {
        alignItems: "center",
        display: "flex",
        padding: "2px 4px",
        width: 400
    }
}));

interface IProps {
    classes: {
        root: string;
        input: string;
        iconButton: string;
        divider: string;
    };
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    label: string;
    value?: string | null | number;
    onChange?: (text?: string | number) => void;
    type?: string;
    className?: string;
    onSubmit?: () => void;
    onClickLeftIcon?: (e?:React.MouseEvent<HTMLButtonElement>)=>void;
}

class IconTextField extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    public render() {
        const {
            classes,
            label,
            leftIcon,
            rightIcon,
            value,
            type,
            className,
            onSubmit,
            onClickLeftIcon
        } = this.props;

        return (
            <form onSubmit={onSubmit}>
                <Paper className={classNames(classes.root, className)}>
                    <IconButton onClick={onClickLeftIcon} className={classes.iconButton}>
                        {leftIcon}
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder={label}
                        inputProps={{ "aria-label": label }}
                        value={value}
                        onChange={this.handleChange}
                        type={type}
                    />
                    <Divider className={classes.divider} />
                    <IconButton
                        color="primary"
                        className={classes.iconButton}
                        type="submit"
                    >
                        {rightIcon}
                    </IconButton>
                </Paper>
            </form>
        );
    }


    private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { onChange } = this.props;

        if (typeof onChange !== "undefined") {
            onChange(e.target.value);
        }
    }
}

export default styler(IconTextField);