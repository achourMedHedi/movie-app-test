import { TestStore } from "../stores/TestStore"

export type TProps = {
    testStore?: TestStore;
}

export type TMovie = {
    _id: string,
    title?: string,
    name?: string,
    poster_path?: string,
}


export type TTvShows = {
    _id: string,
    title?: string,
    name?: string,
    poster_path?: string,

}