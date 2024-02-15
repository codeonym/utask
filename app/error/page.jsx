import React from 'react'
import { FaExclamation } from "react-icons/fa"

function page() {
  return (
    <div
      className='
      flex 
      w-screen 
      h-screen
      items-center justify-center
      '
    >
      <div
        className="
        text-xl bg-slate-200 
        h-96 w-96
        shadow-slate-300 shadow-md 
        flex flex-col items-center justify-center gap-4
        text-slate-500
        
        ">
        <div
          className="
          text-center
          flex flex-col gap-4
          animate duration-200 animate-bounce
        ">
          <FaExclamation
            className='text-6xl'
          />
        </div>
        <span
          className='
          font-extrabold text-5xl text-slate-300
          '

        >
          Oops!
        </span>
        <span>
          SomeThing Went Wrong.
        </span>
      </div>
    </div>
  )
}

export default page