import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicty from '../components/OurPolicty'
import NewsLater from '../components/NewsLater'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicty/>
      <NewsLater/>
    </div>
  )
}

export default Home