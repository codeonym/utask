import React from 'react'
import UserBox from "@dashboard/components/UserBox"
import { GoBellFill } from "react-icons/go";
import Link from 'next/link'
import { IoMdSunny } from "react-icons/io"
import { PiMoonStarsFill } from 'react-icons/pi'
import { AiOutlinePlusCircle } from "react-icons/ai"
import { IoCreateSharp } from "react-icons/io5"
import { MdCreateNewFolder } from "react-icons/md"

function Navbar() {
  return (
    <div className="navbar bg-slate-100 text-slate-600 shadow-md shadow-slate-200 px-4">
      <div className="flex-1">

      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle  hover:bg-slate-200">
            <div className="indicator">
              <GoBellFill className='text-xl' />
              <span className="badge bg-yellow-400 w-5 h-5 rounded-full badge-sm indicator-item">0</span>
            </div>
          </div>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">0 Notifications</span>
              <span className="text-info">You don&apos;t have unseen notifications</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View More</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label className="swap swap-rotate btn btn-ghost btn-circle  hover:bg-slate-200">

            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className="theme-controller" value="synthwave" />

            {/* sun icon */}
            <IoMdSunny className='swap-on text-xl' />
            {/* moon icon */}
            <PiMoonStarsFill className='swap-off text-xl' />
          </label>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-slate-200">
            <div className="text-xl relative before:inset-0 before:rounded-full before:ring-1 before:animate before:animate-ping before:absolute">
              <AiOutlinePlusCircle className='' />
            </div>
          </div>
          <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">Create new</span>
              <div className="card-actions text-left">
                <Link
                  href="/dashboard/tasks/new"
                  className="btn-block p-3 flex gap-2 items-center hover:bg-slate-50">
                  <IoCreateSharp />
                  new task
                </Link>
                <Link
                  href="/dashboard/collections/new"
                  className="btn-block p-3 text-md flex gap-2 items-center hover:bg-slate-50">
                  <MdCreateNewFolder />
                  new collection
                </Link>
              </div>
            </div>
          </div>
        </div>
        <UserBox />
      </div>
    </div>
  )
}

export default Navbar