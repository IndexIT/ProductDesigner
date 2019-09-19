// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import * as React from "react";
import { IProduct } from "../../store/HomePage/types";

const styler = withStyles((theme: Theme) => ({
    card: {
        margin: theme.spacing(2),
        minWidth: 300
    },
    imageCategory:{
        height:200
    },
    imageProduct:{
        height:400
    },
    vendor:{
        color: theme.palette.text.secondary,
        fontSize: ".6em",
    }
}));

interface IProps extends IProduct {
    classes: {
        card: string;
        imageCategory: string;
        imageProduct:string;
        vendor: string;
    };
    type: string;
}

class ProductCard extends React.Component<IProps> {
    public render() {
        const { name, classes, id, type, image, vendorName } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    titleTypographyProps={{ variant: "body1" }}
                    title={name}
                />
                <CardMedia
                    image={"/test/storage/" + type + "s/" + image + ".jpg"}
                    className={type==="product"?classes.imageProduct:classes.imageCategory}
                />
                <CardActionArea  >
                    <Toolbar variant="dense" >
                        {vendorName ? (
                            <Typography className={classes.vendor} >
                                by {vendorName}
                            </Typography>
                        ) : null}
                    </Toolbar>
                </CardActionArea>
            </Card>
        );
    }
}

export default styler(ProductCard);
