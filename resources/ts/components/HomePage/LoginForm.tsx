import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import * as React from "react";

const styler = withStyles((theme: Theme) => ({
    centerAlign: {
        textAlign: "center"
    },
    grow: {
        flexGrow: 1
    },
    input: {
        marginTop: theme.spacing(2)
    }
}));

interface IProps {
    classes: {
        centerAlign: string;
        grow: string;
        input: string;
    };
}

class LoginForm extends React.Component<IProps> {
    public render() {
        const { classes } = this.props;

        return (
            <form>
                <TextField
                    className={classes.input}
                    margin="dense"
                    label="Email"
                    fullWidth={true}
                />
                <TextField
                    className={classes.input}
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth={true}
                />
                <Toolbar>
                    <div className={classes.grow} />
                    <Button color="secondary" variant="outlined">Login</Button>
                </Toolbar>
                <Divider />
                <div className={classes.centerAlign}>
                    <Typography variant="caption" align="center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Browse our products without Login
                    </Typography>
                    <div>
                        <Button size="small" variant="outlined">
                            Browse
                        </Button>
                    </div>
                </div>
            </form>
        );
    }
}

export default styler(LoginForm);
