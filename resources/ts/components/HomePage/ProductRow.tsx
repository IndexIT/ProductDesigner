import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import * as React from "react";
import { IProduct } from "../../store/HomePage/types";
import ProductCard from "./ProductCard";

interface IProps {
    classes: {
        wrapper: string;
    };
    label: string;
    products: IProduct[];
    type: string;
}

const styler = withStyles((theme: Theme) => ({
    wrapper: {
        paddingTop: theme.spacing(2)
    }
}));

class ProductRow extends React.Component<IProps> {
    public render() {
        const { products, label, classes, type } = this.props;

        return (
            <div className={classes.wrapper}>
                <Typography variant="h5">{label}</Typography>
                <Divider />
                <Grid container={true}>
                    {products.map((product, key) => (
                        <Grid item={true} key={key} md={3}>
                            <ProductCard type={type} {...product} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

export default styler(ProductRow);
