import { BASE_URL } from "@config"
import { headers } from "next/headers"
import { redirect } from 'next/navigation'

export async function getTasks() {
  const res = await fetch(BASE_URL + "/api/tasks", {
    headers: headers()
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch tasks')
  }

  return res.json()
}

export async function getCollections() {
  const res = await fetch(BASE_URL + "/api/collections", {
    headers: headers()
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch collections')
  }

  return res.json()
}

export async function getTaskById(taskId) {
  const data = JSON.stringify({
    taskId: taskId
  })
  
  const res = await fetch(BASE_URL + `/api/tasks/${taskId}`, {
    method: "POST",
    body: data,
    headers: headers()
  })

  return res.json()
}

export async function getCollectionById(collectionId) {
  const data = JSON.stringify({
    collectionId: collectionId
  })

  const res = await fetch(BASE_URL + `/api/collections/${collectionId}`, {
    method: "POST",
    body: data,
    headers: headers()
  })

  return res.json()
}

export async function updateTask(taskData) {
  const data = JSON.stringify(taskData)
  const res = await fetch(BASE_URL + `/api/tasks/${taskData._id}`, {
    method: "PUT",
    body: data,
    headers: headers()
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export async function removeTask(taskId) {
  const data = JSON.stringify({
    taskId: taskId
  })
  const res = await fetch(BASE_URL + `/api/tasks/${taskId}`, {
    method: "DELETE",
    body: data,
    headers: headers()
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}