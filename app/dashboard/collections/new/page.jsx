"use client"
import React from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { createAction } from "@actions/collectionAction"
const CollectionForm = () => {
  const router = useRouter()

  const formAction = async (formData) => {

    const res = await createAction(formData)
    if (res) {
      toast.success('Collection created successfully!')
      router.push('/dashboard/collections')
    } else {
      toast.error('Failed to create collection!')
    }
  }
  return (
    <section className="h-full text-slate-600 flex items-center justify-center">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        action={formAction}
      >
        <h2 className="text-2xl font-bold mb-4">Create a Collection</h2>
        <div className="mb-4">
          <label className="bloc text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="border border-slate-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            className="border border-slate-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-400 min-h-32 max-h-32"
            rows="3"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-400 btn px-6 text-white py-2 hover:bg-indigo-500 focus:shadow-outline-indigo active:bg-indigo-600"
          >
            Create
          </button>
        </div>
      </form>
    </section>
  )
}

export default CollectionForm
