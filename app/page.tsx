import Slider from '@/components/Slider'
import { BANNER } from '@/graphql/queries'
import { graphqlServer } from '@/lib/graphql-server'
import React from 'react'

const Home = async () => {
  const { banner } = await graphqlServer.request(BANNER)

  return <Slider banner={banner} />
}

export default Home
