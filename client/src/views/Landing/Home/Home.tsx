import React from 'react'
import AvailableService from './components/AvailableService'
import UpcomingService from './components/UpcomingService'
import HomeHotels from './components/HomeHotels'
import CompanyOverview from './components/CompanyOverview'

const Home = () => {
    return (
        <main className='bg-bgDark text-white'>
            <AvailableService />
            <UpcomingService />
            <HomeHotels />
            <CompanyOverview />
        </main>
    )
}

export default Home