import { MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./store";
import theme from "./theme";

const root = document.createElement("div");
document.body.appendChild(root);

render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    root
);
