import React from 'react'
import type { IScreenWrapperProps } from './types';
import NavBar from './NavBar';

const ScreenWrapper:React.FC<IScreenWrapperProps> = ({children}) => {

  return (
    <div className='flex flex-col min-h-screen w-screen items-center'>
        <NavBar />
        {children}
    </div>
  )
}

export default ScreenWrapper