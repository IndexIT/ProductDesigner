import { MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import store from "../store";
import theme from "../theme";
import Router from "./Router";

class App extends React.Component {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router />
                </Provider>
            </MuiThemeProvider>
        );
    }
}

let Component: React.ComponentType;

Component = process.env.MIX_APP_DEBUG === "true" ? hot(module)(App) : App;

export default Component;
