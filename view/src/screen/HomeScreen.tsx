import React from 'react'
import Header from '../components/Header'
import SearchForm from '../components/SearchForm'

export default function HomeScreen() {
  return (
    <>
      <Header />

      <main className="bg-gray-100 py-10 min-h-screen lg:bg-[url('/bg.svg')] bg- bg-no-repeat bg-right-top bg-[length:50%]">
        <div className='max-w-5xl mx-auto mt-10'>
            <div className='lg:w-1/2 px-10 lg:px-0 space-y-6'>
                <h1 className='text-6xl font-semibold'>
                    All your <span className='text-cyan-400'>Social Networks</span> in one link
                </h1>
                <p className='text-slate-800 text-xl'>
                Join over 10,000 web developers sharing their social media, 
                including Instagram, GitHub, LinkedIn, and more!
                </p>
                <SearchForm />
            </div>
        </div>
      </main>
    </>
  )
}
