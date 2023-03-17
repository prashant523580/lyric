
import Layout from 'components/Layout'
import Link from 'next/link'
import React from 'react'

export default function Chords() {
  return (
   
    <Layout>
      <div className='flex flex-col justify-center items-center space-y-4 h-[100vh]'>

            <Link className='bg-gray-700 text-white rounded-md px-3 py-4 shadow-lg' href={"/chords/guitar"}>Guitar Chords</Link>
            <Link className='bg-gray-700 text-white rounded-md px-3 py-4 shadow-lg' href={"/chords/ukulele"}>ukulele Chords</Link>
      </div>
      </Layout>
  )
}
