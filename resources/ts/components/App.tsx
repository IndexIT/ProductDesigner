import {hot} from 'react-hot-loader'
import * as React from "react";

class App extends React.Component {
    public render (){
        return (
            <div>
                jnjbhjbhjbjhbhj
            </div>
        )
    }
}

let Component: React.ComponentType;

if(process.env.MIX_APP_DEBUG==='true'){
    Component =  hot(module)(App)
} else {
    Component = App;
}

export default Component;