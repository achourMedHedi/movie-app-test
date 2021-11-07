import React, { FC } from "react";
import { Tab, TabsContainer } from "./tabs.styles";
import { TProps } from "./tabs.types";


const Tabs: FC<TProps> = ({ setActiveTab, activeTab }): JSX.Element => (
    <TabsContainer>
        <Tab
            onClick={() => setActiveTab('movies')}
            isActive={activeTab === "movies"}
            id="movies-active-tab"
        >
            Movies
        </Tab>
        <Tab
            onClick={() => setActiveTab('tv-shows')}
            isActive={activeTab === "tv-shows"}
            id="tv-shows-active-tab"
        >
            TV Shows
        </Tab>
    </TabsContainer>
)

export default Tabs