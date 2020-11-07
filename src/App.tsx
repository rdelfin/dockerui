/**
 * @format
 */

import React from "react";
import SiteDrawer from "./SiteDrawer";
import ContainerCard from "./ContainerCard";

function App() {
    return (
        <SiteDrawer>
            <ContainerCard
                name="Sample container"
                command="/bin/yes"
                id="deadbeef"
                stat="running"
            />
        </SiteDrawer>
    );
}

export default App;
