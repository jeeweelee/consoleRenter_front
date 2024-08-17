import React from 'react'
import MainHeader from '../layout/MainHeader'
import ConsoleService from '../common/ConsoleService'
import Parallax from '../common/Parallax'
import ConsoleCarousel from '../common/ConsoleCarousel'

const Home = () => {
  return (
    <section >
      <MainHeader/>
      <section className = 'container'>
        <ConsoleCarousel></ConsoleCarousel>
        <ConsoleCarousel></ConsoleCarousel>
        <ConsoleCarousel></ConsoleCarousel>
        <Parallax></Parallax>
        <ConsoleService/>
        
        


      </section>
    </section >
  )
}

export default Home
