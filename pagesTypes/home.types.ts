import { TestStore } from "../stores/TestStore"

export type TPropsHomePage = {
    moviesListApiResult: TMovie[];
    testStore?: TestStore;
    statusCode: number,
}

export type TMoviesApiResponse = {
    results: TMovie[],
    page: number,
    total_results: number,
    total_pages: number,
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