import React from 'react'
import { MdWatchLater } from "react-icons/md"
import { AiFillCheckCircle } from "react-icons/ai"
import { RiErrorWarningFill } from "react-icons/ri"
import NavLink from '@dashboard/components/NavLink'

function CollectionItem({ collection }) {
  return (
    <div className="collapse collapse-arrow">
      <input type="checkbox" />

      {/* <input type="radio" name="my-accordion-2" /> */}
      <NavLink
        bgColor="bg-slate-300"
        href={`/dashboard/collections/${collection?._id}`}
        className="collapse-title flex items-center space-x-2 hover:bg-slate-700 p-2 rounded">
        <span>{collection?.title}</span>
      </NavLink>
      <ul className="collapse-content ml-6 space-y-2">
        <NavLink
          bgColor="bg-slate-300"
          href={`/dashboard/collections/${collection?._id}/ongoing`}
          className="w-full flex items-center space-x-2 hover:bg-slate-700 p-2 rounded">
          <MdWatchLater className='text-amber-400' />
          <span>Ongoing</span>
        </NavLink>
        <NavLink
          bgColor="bg-slate-300"
          href={`/dashboard/collections/${collection?._id}/done`}
          className="w-full flex items-center space-x-2 hover:bg-slate-700 p-2 rounded">
          <AiFillCheckCircle className='text-emerald-400' />
          <span>done</span>
        </NavLink>
        <NavLink
          bgColor="bg-slate-300"
          href={`/dashboard/collections/${collection?._id}/missed`}
          className="w-full flex items-center space-x-2 hover:bg-slate-700 p-2 rounded">
          <RiErrorWarningFill className='text-red-400' />
          <span>Missed</span>
        </NavLink>
      </ul>
    </div>
  )
}

export default CollectionItem