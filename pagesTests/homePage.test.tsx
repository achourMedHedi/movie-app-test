import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { API_KEY } from "../contants";
import Home from "../pages";

const server = setupServer()
beforeAll(() => server.listen());
afterAll(() => server.close());

const movieData = [{
    _id: "movie-id-1",
    title: "movie title 1"
}]

const tvShowsData = [{
    _id: "tv-show-id-1",
    name: "tv-show title 1"
}]

describe('This will test Test compoent', () => {
    it('should display movies list', async () => {
        render(<Home
            moviesListApiResult={movieData}
            statusCode={200}
        />)
        // tabs css
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")

        // carousel items
        expect(screen.getByTestId('movie-id-1')).toBeInTheDocument()
        expect(screen.getByText('movie title 1')).toBeInTheDocument()


    })
    it('should change TV shows tab as active tab and display loading', () => {

        server.use(
            rest.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`, (req, res, ctx) => {
                return res(ctx.json({
                    results: tvShowsData
                }))
            })
        )
        render(<Home
            moviesListApiResult={movieData}
            statusCode={200}
        />)

        const tvShowsTabButton = screen.getByTestId('tv-shows-active-tab')
        fireEvent.click(tvShowsTabButton)

        // tabs css
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")

        // loading
        expect(screen.getByTestId('square-loading-0')).toBeInTheDocument()
    })
    it('should change TV shows tab as active tab and display tv shows list', async () => {

        server.use(
            rest.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`, (req, res, ctx) => {
                return res(ctx.json({
                    results: tvShowsData
                }))
            })
        )
        render(<Home
            moviesListApiResult={movieData}
            statusCode={200}
        />)

        const tvShowsTabButton = screen.getByTestId('tv-shows-active-tab')
        fireEvent.click(tvShowsTabButton)

        // tabs css
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")

        // loading
        expect(screen.getByTestId('square-loading-0')).toBeInTheDocument()

        await waitFor(() => {

            expect(screen.getByTestId('tv-show-id-1')).toBeInTheDocument()
            expect(screen.getByText('tv-show title 1')).toBeInTheDocument()
        })
    })
    it('should display unauthorized error message when failing to fetch movies list', async () => {
        render(<Home
            moviesListApiResult={[]}
            statusCode={401}
        />)
        // tabs css
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")

        expect(screen.getByText('Unauthorized')).toBeInTheDocument()

    })

    it('should change TV shows tab as active tab and display error when failing to fetch tv shows list', async () => {
        server.use(
            rest.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`, (req, res, ctx) => {
                return res(ctx.status(401))
            })
        )
        render(<Home
            moviesListApiResult={movieData}
            statusCode={200}
        />)

        const tvShowsTabButton = screen.getByTestId('tv-shows-active-tab')
        fireEvent.click(tvShowsTabButton)

        // tabs css
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")
        // loading
        expect(screen.getByTestId('square-loading-0')).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByText('Unauthorized')).toBeInTheDocument()
        })
    })
    it('should change the active tab to TV shows then back to movies tab and display loading if the movies tab has error ', async () => {

        server.use(
            rest.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`, (req, res, ctx) => {
                return res(ctx.json({
                    results: tvShowsData
                }))
            })
        )
        render(<Home
            moviesListApiResult={[]}
            statusCode={500}
        />)

        expect(screen.getByText('Something went wrong')).toBeInTheDocument()

        const tvShowsTabButton = screen.getByTestId('tv-shows-active-tab')
        fireEvent.click(tvShowsTabButton)

        // tabs css
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")

        // loading
        expect(screen.getByTestId('square-loading-0')).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByTestId('tv-show-id-1')).toBeInTheDocument()
            expect(screen.getByText('tv-show title 1')).toBeInTheDocument()
        })


        server.use(
            rest.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`, (req, res, ctx) => {
                return res(ctx.json({
                    results: movieData
                }))
            })
        )
        
        const moviesTabButton = screen.getByTestId('movies-active-tab')
        fireEvent.click(moviesTabButton)

        // loading
        expect(screen.getByTestId('square-loading-0')).toBeInTheDocument()
    })

    it('should change the active tab to TV shows then back to movies tab and display movies list if the movies tab has error ', async () => {
        

        render(<Home
            moviesListApiResult={[]}
            statusCode={500}
        />)

        expect(screen.getByText('Something went wrong')).toBeInTheDocument()

        server.use(
            rest.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`, (req, res, ctx) => {
                return res(ctx.json({
                    results: tvShowsData
                }))
            })
        )

        const tvShowsTabButton = screen.getByTestId('tv-shows-active-tab')
        fireEvent.click(tvShowsTabButton)

        // tabs css
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")

        // loading
        expect(screen.getByTestId('square-loading-0')).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByTestId('tv-show-id-1')).toBeInTheDocument()
            expect(screen.getByText('tv-show title 1')).toBeInTheDocument()
        })


        server.use(
            rest.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`, (req, res, ctx) => {
                return res(ctx.json({
                    results: movieData
                }))
            })
        )
        const moviesTabButton = screen.getByTestId('movies-active-tab')
        fireEvent.click(moviesTabButton)

        // loading
        expect(screen.getByTestId('square-loading-0')).toBeInTheDocument()

        // tabs css
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")

        await waitFor(() => {
            expect(screen.getByTestId('movie-id-1')).toBeInTheDocument()
            expect(screen.getByText('movie title 1')).toBeInTheDocument()
        })
    })
})