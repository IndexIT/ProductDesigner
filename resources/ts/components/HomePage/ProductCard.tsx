// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ShopingCartIcon from "@material-ui/icons/ShoppingCart";
import withStyles from "@material-ui/styles/withStyles";
import * as React from "react";
import {Link} from "react-router-dom";
import { nameToURL } from "../../helper";
import { IProduct } from "../../store/HomePage/types";

const styler = withStyles((theme: Theme) => ({
    card: {
        margin: theme.spacing(2)
    },
    grow: {
        flexGrow:1
    },
    image: {
        display: "block",
        margin: "auto",
    },
    purchaseButton: {
        color: theme.palette.text.secondary+"!important",
        textDecoration: "none!important",
    },
    vendor:{
        color: theme.palette.text.secondary,
        fontSize: ".6em",
    }
}));

interface IProps extends IProduct {
    classes: {
        card: string;
        grow: string;
        image: string;
        purchaseButton: string;
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
                <CardContent>
                    <CardMedia>
                        <img
                            src={"/test/storage/" + type + "s/" + image + ".jpg"}
                            height={type==="product"?"220":"180"}
                            className={classes.image}
                        />
                    </CardMedia>
                </CardContent>
                <CardActionArea  >
                    <Toolbar variant="dense" >
                        {vendorName ? (
                            <Typography className={classes.vendor} >
                                by {vendorName}
                            </Typography>
                        ) : null}
                        <div className={classes.grow} />
                        <Link className={classes.purchaseButton} to={"/"+type+"/"+id+"/"+nameToURL(name)}>
                            <ShopingCartIcon/>
                        </Link>
                    </Toolbar>
                </CardActionArea>
            </Card>
        );
    }
}

export default styler(ProductCard);
