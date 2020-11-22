/**
 * @format
 */

import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const styles = createStyles({
    root: {
        minWidth: 275,
    },
    media: {
        minHeight: 140,
        maxHeight: 300,
    },
    bottom_action: {
        padding: 15,
    },
});

interface Props extends WithStyles<typeof styles> {
    name: string;
    command: string;
    id: string;
    stat: string;
    host: string;
}

function ContainerCard(props: Props) {
    const { classes, name, host } = props;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="body2" component="p">
                    {host}
                </Typography>
                <Typography variant="h5" component="h2">
                    {name}
                </Typography>
            </CardContent>

            <CardActions className={classes.bottom_action}>
                <Button size="small">More</Button>
            </CardActions>
        </Card>
    );
}

export default withStyles(styles)(ContainerCard);
