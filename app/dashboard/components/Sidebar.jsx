"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import CollectionItem from '@dashboard/components/CollectionItem'
import { FaBuffer, FaNetworkWired, FaCalendarCheck, FaTasks, FaArchive } from "react-icons/fa"
import { MdDashboard } from 'react-icons/md'
import { CgMenuGridO } from "react-icons/cg"
import { RxCross2 } from "react-icons/rx";
import NavLink from '@dashboard/components/NavLink'
import { IoCreateSharp } from "react-icons/io5"
import { MdCreateNewFolder } from "react-icons/md"


const DashboardSidebar = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getCollections = async () => {
      const response = await fetch('/api/collections')
      
      const data = await response.json();
      setCollections(data)
    }

    getCollections()
  }, [])

  return (
    <aside
      className={`
      relative
      box-border
      transition-all
      duration-300
      min-h-screen
      bg-slate-700
      ${sidebarOpen
          ? "w-0"
          : "w-80"}
          `}>
      <label
        className="
        btn 
        z-20
        text-slate-500 
        btn-ghost
        hover:bg-transparent
        hover:text-slate-600
        swap 
        swap-rotate 
        absolute 
        top-2
        left-full"
      >

        {/* this hidden checkbox controls the state */}
        <input type="checkbox" onClick={() => setSidebarOpen((prev) => !prev)} />

        {/* hamburger icon */}
        <CgMenuGridO className="swap-off text-2xl" />
        {/* close icon */}
        <RxCross2 className="swap-on text-2xl" />
      </label>
      <div
        className="
        pt-16
        max-h-screen
        overflow-y-auto
        scrollbar-thin 
        scrollbar-thumb-slate-200 
        scrollbar-track-slate-100
        scrollbar-rounded-md
      text-slate-400
        flex-shrink-0
        flex-col flex
      ">
        {/* Logo */}
        <div
          className="
            pt-16
            flex
            items-center
            flex-col
            justify-between
            space-y-4
            ">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={120}
            height={30}
            className="" />
        </div>

        {/* Sidebar Links */}
        <nav className="p-4 mt-12">
          <ul className="space-y-2">
            <li>
              <NavLink bgColor="bg-slate-300" href="/dashboard"
                className="flex items-center p-2 font-bold hover:bg-slate-800 rounded gap-2">
                {/* Placeholder for dashboard icon */}
                <MdDashboard />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink bgColor="bg-slate-300" href="/dashboard/tasks/new"
                className="flex items-center p-2 font-bold hover:bg-slate-800 rounded gap-2">
                {/* Placeholder for dashboard icon */}
                <IoCreateSharp />
                Create task
              </NavLink>
            </li>
            <li>
              <NavLink bgColor="bg-slate-300" href="/dashboard/collections/new"
                className="flex items-center p-2 font-bold hover:bg-slate-800 rounded gap-2">
                {/* Placeholder for dashboard icon */}
                <MdCreateNewFolder />
                Create collection
              </NavLink>
            </li>
            <li>
              <NavLink bgColor="bg-slate-300" href="/dashboard/tasks"
                className="flex items-center p-2 font-bold hover:bg-slate-800 rounded gap-2">
                {/* Placeholder for dashboard icon */}
                <FaTasks />
                All tasks
              </NavLink>
            </li>
            <li>
              <NavLink bgColor="bg-slate-300" href="/dashboard/collections"
                className="flex items-center p-2 font-bold hover:bg-slate-800 rounded gap-2">
                {/* Placeholder for dashboard icon */}
                <FaArchive />
                All Collections
              </NavLink>
            </li>
            <li className="hover:bg-slate-800 rounded">
              <div className="flex flex-col justify-center p-2">
                <span className='font-bold flex items-center gap-2'>
                  <FaBuffer />
                  Task Collections
                </span>
                <ul>
                  {collections.length > 0
                    ? collections.map((collection) => (
                      <li key={collection._id}>
                        {/* Use the key prop to provide a unique identifier */}
                        <CollectionItem collection={collection} />
                      </li>
                    ))
                    : (
                      <li>
                        No collections
                      </li>
                    )}
                </ul>
              </div>
            </li>
            <li>
              <ul className="font-bold space-y-2">
                <li>
                  <NavLink bgColor="bg-slate-300" href="/dashboard/calendar" className="flex items-center space-x-2 hover:bg-slate-800 p-2 rounded gap-2">
                    <FaCalendarCheck />
                    <span>Calendar</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink bgColor="bg-slate-300" href="/dashboard/threads" className="flex items-center space-x-2 hover:bg-slate-800 p-2 rounded gap-2">
                    <FaNetworkWired />
                    <span>Threads</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

    </aside>
  )
}

export default DashboardSidebar