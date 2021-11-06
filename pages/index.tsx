import { css } from '@emotion/css'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Carousel from '../components/carousel/carousel.component'
import Header from '../components/indexPage/Header/Header'
import NavBar from '../components/navBar/NavBar.component'
import Tabs from '../components/tabs/Tabs.component'
import { ActiveTab } from '../components/tabs/Tabs.types'
import Test from '../components/Test.component'
import { TestStore } from '../stores/TestStore'
import { CarouselContainer } from '../styles/indexPage.styles'

type IProps = {
  testStore?: TestStore;
}

const Home: NextPage<IProps> = ({ testStore }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("movies")
  return (
    <div>
      <NavBar />
      <Header
        title="GO TV"
        subTitle="Premiering this week"
        description="Get the best TV plan in Malta with GO TV. Want to just connect to TV over internet? Then our GO TV subscription is for you!"
      />
      <Tabs
        activeTab={activeTab}
        setActiveTab={(newValue) => setActiveTab(newValue)}
      />
      <CarouselContainer>
        <Carousel />
      </CarouselContainer>
    </div>
  )
}

export default inject('testStore')(observer(Home))
