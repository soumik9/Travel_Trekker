import React from 'react'
import AvailableService from './components/AvailableService'
import UpcomingService from './components/UpcomingService'
import HomeHotels from './components/HomeHotels'
import CompanyOverview from './components/CompanyOverview'
import ClientsReview from './components/ClientsReview'
import Hero from './components/Hero'
import FAQ from './components/FAQ'
import LatestNews from './components/LatestNews'
import Contact from './components/Contact'

const Home = () => {
    return (
        <main className='bg-bgDark text-white'>
            <Hero />
            <AvailableService />
            <UpcomingService />
            <HomeHotels />
            <CompanyOverview />
            <ClientsReview />
            <LatestNews />
            <FAQ />
            <Contact />
        </main>
    )
}

export default Home