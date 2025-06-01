import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar:React.FC = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

  return (
    <div className='bg-white px-4 py-2 shadow flex w-full flex-col items-center mb-4'>
        <p onClick={handleLogoClick} className='font-bold hover:text-gray-600 text-2xl cursor-pointer transition-colors duration-300'>PSE</p>
    </div>
  )
}

export default NavBar