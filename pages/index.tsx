import { css } from '@emotion/css'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Test from '../components/Test.component'
import { TestStore } from '../stores/TestStore'

type IProps = {
  testStore?: TestStore;
}

const Home: NextPage<IProps> = ({ testStore }) => {
  return (
    <div className={css`
    color: red;
    `}>
      <Test />
    </div>
  )
}

export default inject('testStore')(observer(Home))
