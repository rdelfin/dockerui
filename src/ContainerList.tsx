/**
 * @format
 */

import React from "react";
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ContainerCard from "./ContainerCard";

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
    id: string;
    name: string;
    command: string;
    status: string;
    state: string;
}

interface Props extends WithStyles<typeof styles> {}
interface State {
    containers: Record<string, Array<Container>>;
    hosts: Array<string>;
}

class ContainerList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            containers: {},
            hosts: [
                "bernal.rdelfin.net",
                "tepozteco.rdelfin.net",
                "paricutin.rdelfin.net",
                "malinche.rdelfin.net",
            ],
        };
    }

    componentDidMount() {
        Promise.all(
            this.state.hosts.map((host) => {
                return fetch("/agent/" + host + "/docker/list")
                    .then((res) => {
                        if (!res.ok) {
                            throw res;
                        }
                        return res.json() as Promise<Array<Container>>;
                    })
                    .then((json) => [host, json])
                    .catch((error) =>
                        console.log(
                            "Error fetching docker list for " +
                                host +
                                ": " +
                                error
                        )
                    );
            })
        )
            .then((container_list) => {
                let container_map: Record<string, Array<Container>> = {};

                container_list.forEach((pair) => {
                    if (pair !== undefined) {
                        const host = pair[0] as string;
                        const containers = pair[1] as Array<Container>;
                        container_map[host] = containers;
                    }
                });

                this.setState({
                    containers: container_map,
                });
            })
            .catch((error) =>
                console.log("Error fetching docker list for hosts: " + error)
            );
    }

    render() {
        const { classes } = this.props;

        let containers: Array<[string, Container]> = [];

        for (let hostname in this.state.containers) {
            this.state.containers[hostname].forEach((container) => {
                containers.push([hostname, container]);
            });
        }

        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={5}>
                        {containers.map((value) => (
                            <Grid key={value[1].id} item>
                                <ContainerCard
                                    id={value[1].id}
                                    name={value[1].name}
                                    command={value[1].command}
                                    host={value[0]}
                                    status={value[1].status}
                                    state={value[1].state}
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
