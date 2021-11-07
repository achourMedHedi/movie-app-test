import { render, screen, fireEvent } from "@testing-library/react"
import Tabs from "./Tabs.component"
import Home from '../../pages/index'


describe('This will test Tabs component', () => {
    it('should display tab movie as active tab', () => {
        render(<Tabs activeTab="movies" setActiveTab={() => {}} />)
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")
    })
    it('should display tab tv-shows as active tab', async () => {
        render(<Tabs activeTab="tv-shows" setActiveTab={() => {}} />)
        expect(screen.getByTestId('movies-active-tab')).toHaveStyle("border-bottom: 3px solid transparent;")
        expect(screen.getByTestId('tv-shows-active-tab')).toHaveStyle("border-bottom: 3px solid #522583;")
    })
})