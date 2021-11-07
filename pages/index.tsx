import { css } from '@emotion/css'
import axios, { AxiosError } from 'axios'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Carousel from '../components/carousel/carousel.component'
import ErrorHandler from '../components/errorHandler/Errorhandler.component'
import Header from '../components/indexPage/Header/Header'
import NavBar from '../components/navBar/NavBar.component'
import Tabs from '../components/tabs/Tabs.component'
import { TActiveTab } from '../components/tabs/tabs.types'
import { TMovie, TProps, TTvShows } from '../pagesTypes/home.types'
import { fetchMoviesListApi } from '../services/movies.service'
import { fetchTvShowsListApi } from '../services/twShows.service'
import { CarouselContainer } from '../styles/home.styles'



// const Home: NextPage<TProps> = ({ testStore }) => {
const Home: NextPage<TProps> = () => {
  const [activeTab, setActiveTab] = useState<TActiveTab>("movies")
  const [moviesList, setMoviesList] = useState<TMovie[]>([])
  const [tvShowsList, setTvShowsList] = useState<TTvShows[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchApiStatus, setFetchApiStatus] = useState<number | undefined>()

  useEffect(() => {
    fetchMovies()
  }, [])


  const fetchMovies = async () => {
    try {
      setLoading(true)
      const result = await fetchMoviesListApi()
      setMoviesList(result.slice(0, 10))
      setLoading(false)
      setFetchApiStatus(200)
    } catch (error) {
      const err = error as AxiosError
      if (err.response) {
        setFetchApiStatus(err.response.status)
      }
      setLoading(false)
    }
  }

  const fetchTvShows = async () => {
    try {
      setLoading(true)
      const result = await fetchTvShowsListApi()
      setTvShowsList(result.slice(0, 10))
      setLoading(false)
      setFetchApiStatus(200)
    } catch (error: any) {
      const err = error as AxiosError
      if (err.response) {
        setFetchApiStatus(err.response.status)
      }
      setLoading(false)
    }
  }

  const onChangeActiveTab = (newValue: TActiveTab): void => {
    setFetchApiStatus(200)
    if (newValue === "tv-shows" && tvShowsList.length === 0) {
      fetchTvShows()
    }

    if (newValue === "movies" && moviesList.length === 0) {
      fetchMovies()
    }
    return setActiveTab(newValue)
  }

  return (
    <div>
      <div className="">
        <NavBar />
        <Header
          title="GO TV"
          subTitle="Premiering this week"
          description="Get the best TV plan in Malta with GO TV. Want to just connect to TV over internet? Then our GO TV subscription is for you!"
        />
        <Tabs
          activeTab={activeTab}
          setActiveTab={onChangeActiveTab}
        />
        <ErrorHandler statusCode={fetchApiStatus} >
          <CarouselContainer>
            <Carousel
              loading={loading}
              activeTab={activeTab}
              moviesList={moviesList}
              tvShowsList={tvShowsList}
            />
          </CarouselContainer>
        </ErrorHandler>
      </div>
    </div>
  )
}

// export default inject('testStore')(observer(Home))
export default Home
