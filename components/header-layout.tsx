'use client';

import { ModeToggle } from "./toggle-button";

export default function Header() {
    
  return (
    <header className=' bg-white w-full p-4 border-b-2 border-gray-200 flex flex-row items-center justify-between'>
        <h1 className='font-bold text-2xl'>AuthJs</h1>
       <ModeToggle/>
      </header>
  )
}
