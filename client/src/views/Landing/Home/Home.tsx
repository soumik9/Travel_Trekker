import React from 'react'
import AvailableService from './components/AvailableService'
import UpcomingService from './components/UpcomingService'
import HomeHotels from './components/HomeHotels'
import CompanyOverview from './components/CompanyOverview'
import ClientsReview from './components/ClientsReview'

const Home = () => {
    return (
        <main className='bg-bgDark text-white'>
            <AvailableService />
            <UpcomingService />
            <HomeHotels />
            <CompanyOverview />
            <ClientsReview />
        </main>
    )
}

export default Home