import Button from "@material-ui/core/Button";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/styles/withStyles";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../rootReducer";
import { changeEmail, changePassword, changePasswordConfirmation } from "../../store/RegisterForm/actions";
import { IRegisterFormState } from "../../store/RegisterForm/types";

const styler = withStyles((theme: Theme) => ({
    grow: {
        flexGrow: 1
    },
    input: {
        marginTop: theme.spacing(2)
    }
}));

interface IProps extends IRegisterFormState {
    classes: {
        grow: string;
        input: string;
    };
    onChangeEmail: (email:string)=>void;
    onChangePassword: (password:string)=>void;
    onChangePasswordConfirmation: (passwordConfirmation:string)=>void;
}

export const mapStateToProps = (state:AppState):IRegisterFormState=>({
    ...state.registerForm
});

export const mapDispatchToProps = (dispatch:ThunkDispatch<{},{},any>)=>({
    onChangeEmail: (email:string)=>dispatch(changeEmail(email)),
    onChangePassword: (password:string)=>dispatch(changePassword(password)),
    onChangePasswordConfirmation: (passwordConfirmation:string)=>dispatch(changePasswordConfirmation(passwordConfirmation))
});

class RegisterForm extends React.Component<IProps> {

    constructor(props:IProps){
        super(props);

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordConfirmation = this.handleChangePasswordConfirmation.bind(this);
    }

    public render(){

        const {classes,email,password,passwordConfirmation} = this.props;

        return (
            <form>
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
                    <Button color="secondary" variant="outlined">Register</Button>
                </Toolbar>
            </form>
        );
    }

    protected handleChangeEmail(e:React.ChangeEvent<HTMLInputElement>){
        this.props.onChangeEmail(e.target.value);
    }

    protected handleChangePassword(e:React.ChangeEvent<HTMLInputElement>){
        this.props.onChangePassword(e.target.value);
    }

    protected handleChangePasswordConfirmation(e:React.ChangeEvent<HTMLInputElement>){
        this.props.onChangePasswordConfirmation(e.target.value);
    }

}

export default connect(mapStateToProps,mapDispatchToProps)( styler (RegisterForm));