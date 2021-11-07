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
import { API_KEY } from '../contants'
import { TMovie, TMoviesApiResponse, TPropsHomePage, TTvShows } from '../pagesTypes/home.types'
import { fetchMoviesListApi } from '../services/movies.service'
import { fetchTvShowsListApi } from '../services/twShows.service'
import { CarouselContainer } from '../styles/home.styles'



// const Home: NextPage<TProps> = ({ testStore }) => {
const Home: NextPage<TPropsHomePage> = ({ moviesListApiResult, statusCode }) => {
  const [activeTab, setActiveTab] = useState<TActiveTab>("movies")
  const [moviesList, setMoviesList] = useState<TMovie[]>(moviesListApiResult)
  const [tvShowsList, setTvShowsList] = useState<TTvShows[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchApiStatusCode, setFetchApiStatusCode] = useState<number | undefined>(statusCode)

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const result = await fetchMoviesListApi()
      setMoviesList(result.slice(0, 10))
      setLoading(false)
      setFetchApiStatusCode(200)
    } catch (error) {
      const err = error as AxiosError
      if (err.response) {
        setFetchApiStatusCode(err.response.status)
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
      setFetchApiStatusCode(200)
    } catch (error: any) {
      const err = error as AxiosError
      if (err.response) {
        setFetchApiStatusCode(err.response.status)
      }
      setLoading(false)
    }
  }

  const onChangeActiveTab = (newValue: TActiveTab): void => {
    setFetchApiStatusCode(200)
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
        <ErrorHandler statusCode={fetchApiStatusCode} >
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

export async function getStaticProps() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
  if (res.status === 200 || res.status === 201) {
    const moviesData: TMoviesApiResponse = await res.json()
    const moviesListApiResult = moviesData.results.slice(0, 10)
    return {
      props: {
        statusCode: 200,
        moviesListApiResult,
      },
    }
  } else {
    return ({
      props: {
        statusCode: res.status,
        moviesListApiResult: [],
      }
    })
  }
}

// export default inject('testStore')(observer(Home))
export default Home
