export type ActiveTab = 'movies' | 'tv-shows'

export type TProps = {
    activeTab: ActiveTab,
    setActiveTab: (newValue: ActiveTab) => void
}
