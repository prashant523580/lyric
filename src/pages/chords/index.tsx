
import Layout from 'components/Layout'
import Link from 'next/link';
import  React from 'react';
import Image from 'next/image';

const chordLinks = [
  {
    img: '/images/ukulele.png',
    title: 'Guitar chords',
    width: '40%',
    path:"/chords/guitar"
  },
  {
    img: '/images/ukulele.png',
    title: 'Ukulele chords',
    width: '30%',
    path:"/chords/ukulele"
  },
];



export default function Chords() {
  return (
   
    <Layout>
      <div className='flex flex-1'>
    {
      chordLinks.map((link ,ind) =>{
        return(

          <Link key={ind} className='w-[200px] text-center bg-gray-800 text-white rounded-md px-3 py-3 mx-2 my-2 shadow-lg' href={link.path}><Image alt='logo' src={link.img} width={40} height={40}/> {link.title}</Link>
        )
      })
    }
           </div>
      </Layout>
  )
}
