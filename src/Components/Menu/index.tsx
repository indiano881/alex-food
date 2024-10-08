import Link from 'next/link'
import React from 'react'
import Button from '../Button'

const Menu = () => {
  return (
    <nav className='flex justify-evenly py-4 bg-orange-400 sticky top-[120px] md:top-[128px]'>
      <Link href="/"><Button buttonText='Home' onClick={()=>{}}/></Link>
      <Link href="/profile"><Button buttonText='Profile' onClick={()=>{}}/></Link>
      <Link href="/category"><Button buttonText='Category' onClick={()=>{}}/></Link>
    </nav>
  )
}

export default Menu
