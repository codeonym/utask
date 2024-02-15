import React from 'react'
import Link from 'next/link'

function CollectionCard({ collection }) {
  return (
    <Link
      href={`/dashboard/collections/${collection._id}`}
      className=" flex flex-col justify-between border p-4 rounded-md shadow-lg shadow-slate-300 hover:shadow-xl transition-shadow duration-300 hover:shadow-slate-300 tooltip"
      data-tip={collection.title}
    >
      <h2 className="text-2xl bg-indigo-300 hover:bg-indigo-400 text-white rounded-md py-2 px-1 font-semibold mb-2 truncate">
        {collection.title}
      </h2>
      <p className="text-slate-500 mb-4">{collection.description}</p>
      <div className="flex justify-between mt-5 text-sm text-slate-600">
        <p>Created: {new Date(collection.creationDate).toLocaleDateString()}</p>
        <p>Total tasks:
          <span
            className='font-bold text-indigo-300 p-2'
          >
            {collection.tasks.length}
          </span>
        </p>
      </div>
    </Link>
  )
}

export default CollectionCard