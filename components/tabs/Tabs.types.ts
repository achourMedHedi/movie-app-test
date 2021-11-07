export type TActiveTab = 'movies' | 'tv-shows'

export type TProps = {
    activeTab: TActiveTab,
    setActiveTab: (newValue: TActiveTab) => void
}
