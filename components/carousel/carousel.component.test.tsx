import { render, screen } from "@testing-library/react"
import Carousel from "./carousel.component"


describe('This will test carousel compoent', () => {
    it("should display loading carousel", () => {
        render(<Carousel
            activeTab="movies"
            loading={true}
            moviesList={[]}
            tvShowsList={[]}
        />)
        expect(screen.getByTestId('square-loading-0')).toBeInTheDocument()
    })
    it("should display movies list", () => {
        render(<Carousel
            activeTab="movies"
            loading={false}
            moviesList={[{
                _id: "movie-test-id-1",
                title: "movie test title"
            }]}
            tvShowsList={[{
                _id: "tv-show-test-id-1",
                title: "tv-show test title"
            }]}
        />)
        expect(screen.getByTestId('movie-test-id-1')).toBeInTheDocument()
        expect(screen.getByText('movie test title')).toBeInTheDocument()
    })
    it("should display tv-shows list", () => {
        render(<Carousel
            activeTab="tv-shows"
            loading={false}
            moviesList={[{
                _id: "movie-test-id-1",
                title: "movie test title"
            }]}
            tvShowsList={[{
                _id: "tv-show-test-id-1",
                title: "tv-show test title"
            }]}
        />)
        expect(screen.getByTestId('tv-show-test-id-1')).toBeInTheDocument()
        expect(screen.getByText('tv-show test title')).toBeInTheDocument()
    })
})