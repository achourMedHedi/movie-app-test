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

describe('This will test Test compoent', () => {
    it('should display loading while mounting the page', () => {
        server.use(
            rest.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`, (req, res, ctx) => {
                return res(ctx.json({
                    results: []
                }))
            })
        )
        render(<Home />)
        // tabs css
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")

        // loading
        expect(screen.getByTestId('square-loading-0')).toBeInTheDocument()

    })
    it('should display movies list', async () => {
        server.use(
            rest.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=463a61f066ec122150c765f5828a7826&language=en-US&page=1`, (req, res, ctx) => {
                return res(ctx.json({
                    results: [{
                        _id: "movie-id-1",
                        title: "movie title 1"
                    }]
                }))
            })
        )
        render(<Home />)
        // tabs css
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")
        // loading
        expect(screen.getByTestId('square-loading-0')).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByTestId('movie-id-1')).toBeInTheDocument()
            expect(screen.getByText('movie title 1')).toBeInTheDocument()
        })

    })
    it('should change TV shows tab as active tab and display loading', () => {

        server.use(
            rest.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`, (req, res, ctx) => {
                return res(ctx.json({
                    results: [{
                        _id: "tv-show-id-1",
                        title: "tv-show title 1"
                    }]
                }))
            })
        )
        render(<Home />)

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
                    results: [{
                        _id: "tv-show-id-1",
                        title: "tv-show title 1"
                    }]
                }))
            })
        )
        render(<Home />)

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
        server.use(
            rest.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`, (req, res, ctx) => {
                return res(ctx.status(401))
            })
        )
        render(<Home />)
        // tabs css
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")
        // loading
        expect(screen.getByTestId('square-loading-0')).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByText('Unauthorized')).toBeInTheDocument()
        })
    })

    it('should change TV shows tab as active tab and display error when failing to fetch tv shows list', async () => {
        server.use(
            rest.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`, (req, res, ctx) => {
                return res(ctx.status(401))
            })
        )
        render(<Home />)

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
})