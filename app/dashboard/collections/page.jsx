import React from 'react'
import { faker } from '@faker-js/faker'
import CollectionCard from "@dashboard/collections/components/CollectionCard"
import { getCollections } from "@lib/fetchResource"

async function CollectionsPage() {

  const collections = await getCollections()
  return (
    <section className="lg:container mx-auto p-4 text-slate-600">
      <h2
        className='text-2xl p-4 flex font-bold flex-col gap-3 items-start'
      >
        Your collections
        <span
          className="w-32 h-2 bg-yellow-300 rounded-full block"
        />
      </h2>
      <div
        className='
        flex items-center flex-wrap justify-center gap-2 py-4
        '
      >
        {/* Filters and search here */}
        <form className="join">
          <div>
            <div>
              <input className="input input-bordered join-item" placeholder="Search" />
            </div>
          </div>
          <select className="select select-bordered join-item">
            <option disabled selected>order</option>
            <option>Ascending</option>
            <option>Descending</option>
          </select>
          <select className="select select-bordered join-item">
            <option disabled selected>title</option>
            <option>Alphabets [A-Z]</option>
            <option>Alphabets [Z-A]</option>
          </select>
          <select className="select select-bordered join-item">
            <option disabled selected>time</option>
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
          <button className="btn join-item">Search</button>
        </form>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4  gap-4">
        {collections.length > 0
          ? collections.map((collection) => (
            <CollectionCard collection={collection} key={collection._id} />
          ))
          : (
            <div> no collections yet </div>
          )}
      </div>
    </section>
  )
}

export default CollectionsPage