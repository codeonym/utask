import { connectToDB } from "@utils/connectDB"
import Task from "@models/Task"
import { getServerSession } from "next-auth"
import { authOptions } from "@api/auth/[...nextauth]/route"

export const DELETE = async (req) => {

  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 401,
      })
    }
    await connectToDB()
    const { taskId } = await req.json()

    if (!taskId) {
      return new Response(JSON.stringify({ error: "Id is required" }), {
        status: 400,
      })
    }

    const deletedTask = await Task.findByIdAndDelete(taskId)

    if (!deletedTask) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      })
    }
    return new Response(JSON.stringify({ message: "task deleted" }), {
      status: 200
    })
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({
      error: "Failed to delete task"
    }), { status: 500 })
  }
}