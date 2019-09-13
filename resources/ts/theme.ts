import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
    palette:{
        primary:{
            dark:"#f0f0f0",
            light:"#fff",
            main:"#f7f7f7",
        },
        secondary:{
            dark:"#cc0c00",
            light: "#fd1c24",
            main: "#ed1c24",
        },
        text:{
            primary:"#000",
            secondary:"#cc0c00",
        }
    }
});

export default theme;
