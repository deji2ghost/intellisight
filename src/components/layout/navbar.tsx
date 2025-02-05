"use client"

import { useTheme } from '@/context/themeContext';
import React from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'
import CustomButton from '../ui/customButton/customButton';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
  return (
    <div className='flex items-center bg-purpleFragments-#EFEBFF dark:bg-purpleFragments-#633CFF py-3 px-5 md:px-10 justify-between'>
      <h1 className='font-400 text-[20px]'>P2P transactions</h1>
      <CustomButton
      onClick={toggleTheme}
      className="p-2 rounded-md bg-purpleFragments-#633CFF dark:bg-gray-700 transition"
    >
      {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
      {theme === "light" ? "Dark" : "Light" }
    </CustomButton>
    </div>
  )
}

export default Navbar
