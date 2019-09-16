import * as React from "react";
// import { hot } from "react-hot-loader";
import Router from "./Router";

class App extends React.Component {
    public render(){
        return (
            <Router />
        );
    }
}

// let Component: React.ComponentType;

// Component = process.env.MIX_APP_DEBUG === "true" ? hot(module)(App) : App;

export default App;
