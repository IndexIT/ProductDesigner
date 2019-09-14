import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { validate } from "../../helper";
import { AppState } from "../../rootReducer";
import { changeEmail, changePassword } from "../../store/LoginForm/actions";
import { ILoginFormState } from "../../store/LoginForm/types";

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

interface IProps extends ILoginFormState {
    classes: {
        centerAlign: string;
        grow: string;
        input: string;
    };
    onChangeEmail: (email: string) => void;
    onChangePassword: (password: string) => void;
}

export const mapStateToProps = (state: AppState) => ({
    ...state.loginForm
});

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onChangeEmail: (email: string) => dispatch(changeEmail(email)),
    onChangePassword: (password: string) => dispatch(changePassword(password))
});

class LoginForm extends React.Component<IProps> {

    constructor(props:IProps){
        super(props);

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    public render() {
        const { classes,email,password } = this.props;

        const emailError = validate(email,"required","email");
        const passwordError = validate(password,"required","password","min:6");

        return (
            <form>
                <TextField
                    className={classes.input}
                    margin="dense"
                    label="Email"
                    fullWidth={true}
                    value={email}
                    onChange={this.handleChangeEmail}
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    className={classes.input}
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth={true}
                    value={password}
                    onChange={this.handleChangePassword}
                    error={!!passwordError}
                    helperText={passwordError}
                />
                <Toolbar>
                    <div className={classes.grow} />
                    <Button color="secondary" variant="outlined">
                        Login
                    </Button>
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

    protected handleChangePassword(e:React.ChangeEvent<HTMLInputElement>){
        const {onChangeEmail} = this.props;

        onChangeEmail(e.target.value);
    }

    protected handleChangeEmail(e:React.ChangeEvent<HTMLInputElement>){
        const {onChangePassword} = this.props;

        onChangePassword(e.target.value);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(LoginForm));
