import { TMovie, TTvShows } from "../../pagesTypes/home.types"
import { TActiveTab } from "../tabs/tabs.types"


export type TProps = {
    moviesList: TMovie[],
    tvShowsList: TTvShows[],
    activeTab: TActiveTab,
    loading: boolean
}

export type TState = {
    activeIndex: number,
    mobileCarouselStartTouchPosition: number,
    mobileCarouselMoveTouchPosition: number,
    activeTab: TActiveTab
}
