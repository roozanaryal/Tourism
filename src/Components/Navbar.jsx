import React from 'react'
import logo from '../assets/logo.png'

export default function Navbar() {
  return (
      <>
          <nav>
              <ul className='flex justify-start items-center px-24 gap-4 h-16 '>
                  <img className='h-14 w-24' src={logo} alt="Logo" />
                  <li className=''>Attraction</li>
                  <li className=''>Gallery</li>
                  <li className=''>Connect With Us</li>
                  <li className=''>Community</li>
                  <li className=''>Guides</li>
                  <li className=''>Login/Register</li>
              </ul>
        </nav>
      </>
  )
}
