/**
 * @format
 */

import React from "react";
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ContainerCard from "./ContainerCard";
import http from "http";

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
});

interface Container {
    Id: string;
    Names: Array<string>;
    command: string;
    stat: string;
    state: string;
}

interface Props extends WithStyles<typeof styles> {}
interface State {
    containers: Array<Container>;
}

class ContainerList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { containers: [] };
    }

    componentDidMount() {
        http.get(
            {
                socketPath: "/var/run/docker.sock",
                path: "/v1.40/containers/json",
            },
            (res) => {
                if (res.statusCode !== 200) {
                    console.log("Error getting containers: " + res);
                    return;
                }

                res.setEncoding("utf8");
                res.on("data", (data) => {
                    console.log("Got data " + data);
                    this.setState({
                        containers: JSON.parse(data),
                    });
                });
                res.on("error", (error) => console.log(error));
            }
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={5}>
                        {this.state.containers.map((value) => (
                            <Grid key={value.Id} item>
                                <ContainerCard
                                    id={value.Id}
                                    name=""
                                    command=""
                                    stat=""
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ContainerList);
