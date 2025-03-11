import React from 'react'

import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
       <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="text-white text-lg uppercase font-serif">Vehicle Rent Management</div>
            <div>
                <Link to='/signup' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
                    Sign Up
                </Link>
                <Link to='/signin' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Sign In
                </Link>
            </div>
        </nav>
        
    </div>
  )
}

export default Nav
