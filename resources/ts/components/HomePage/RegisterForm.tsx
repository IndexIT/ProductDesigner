import Button from "@material-ui/core/Button";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import withStyles from "@material-ui/styles/withStyles";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../rootReducer";
import {
    changeEmail,
    changePassword,
    changePasswordConfirmation,
    emailAgain,
    submit,
} from "../../store/RegisterForm/actions";
import { IRegisterFormState } from "../../store/RegisterForm/types";

const styler = withStyles((theme: Theme) => ({
    alignText: {
        paddingTop: theme.spacing(2),
        textAlign: "center",
    },
    grow: {
        flexGrow: 1
    },
    input: {
        marginTop: theme.spacing(2)
    }
}));

interface IProps extends IRegisterFormState {
    classes: {
        alignText: string;
        grow: string;
        input: string;
    };
    onChangeEmail: (email: string) => void;
    onChangePassword: (password: string) => void;
    onChangePasswordConfirmation: (passwordConfirmation: string) => void;
    onSubmit: (
        email: string,
        password: string,
        passwordConfirmation: string
    ) => void;
    onEmailAgain: (userId:number)=>void;
}

export const mapStateToProps = (state: AppState): IRegisterFormState => ({
    ...state.registerForm
});

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onChangeEmail: (email: string) => dispatch(changeEmail(email)),
    onChangePassword: (password: string) => dispatch(changePassword(password)),
    onChangePasswordConfirmation: (passwordConfirmation: string) =>
        dispatch(changePasswordConfirmation(passwordConfirmation)),
    onEmailAgain: (userId:number)=>dispatch(emailAgain(userId)),
    onSubmit: (email: string, password: string, passwordConfirmation: string) =>
        dispatch(submit(email, password, passwordConfirmation)),
});

class RegisterForm extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordConfirmation = this.handleChangePasswordConfirmation.bind(
            this
        );
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickEmailAgain = this.handleClickEmailAgain.bind(this);
    }

    public render() {
        const {
            classes,
            email,
            password,
            passwordConfirmation,
            userId
        } = this.props;

        if (userId) {
            return (
                <div className={classes.alignText}>
                    <Typography variant="caption" align="center">
                    You have successfully received an email. If you didint
                    received click below button to send again.
                    </Typography>
                    <div  className={classes.alignText}>
                        <Button onClick={this.handleClickEmailAgain} variant="outlined" color="secondary">
                            <RefreshIcon />
                            Send Again
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    className={classes.input}
                    margin="dense"
                    label="Email"
                    fullWidth={true}
                    value={email}
                    onChange={this.handleChangeEmail}
                />
                <TextField
                    className={classes.input}
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth={true}
                    value={password}
                    onChange={this.handleChangePassword}
                />
                <TextField
                    className={classes.input}
                    margin="dense"
                    label="Confirm Your Password"
                    type="password"
                    fullWidth={true}
                    value={passwordConfirmation}
                    onChange={this.handleChangePasswordConfirmation}
                />
                <Toolbar>
                    <div className={classes.grow} />
                    <Button type="submit" color="secondary" variant="outlined">
                        Register
                    </Button>
                </Toolbar>
            </form>
        );
    }

    protected handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const { onSubmit, email, password, passwordConfirmation } = this.props;

        onSubmit(email, password, passwordConfirmation);
    }

    protected handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChangeEmail(e.target.value);
    }

    protected handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChangePassword(e.target.value);
    }

    protected handleChangePasswordConfirmation(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        this.props.onChangePasswordConfirmation(e.target.value);
    }

    protected handleClickEmailAgain(){
        const {userId,onEmailAgain} = this.props;

        if(!userId){
            return null;
        }

        onEmailAgain(userId);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(RegisterForm));
