import { connectToDB } from "@utils/connectDB"
import Task from "@models/Task"

// Define the handler function for the API route
export const POST = async (req) => { // Use the NextApiResponse type for the res parameter

  // Check the request method
  switch (req.method) {

    // If it is a POST request, create a new task
    case 'POST':
      try {
        const {
          userId,
          title,
          description,
          dueDate,
          status,
          todo,
          labels,
          collaborators,
          priority,
        } = await req.json()
        await connectToDB();

        const task = new Task({
          userId: userId,
          title: title,
          description: description,
          dueDate: dueDate,
          status: status,
          todo: todo,
          labels: labels,
          collaborators: collaborators,
          priority: priority,
        })
        // Save the task to the database
        await task.save()

        // Send a success response with the task data and status code 201
        return new Response(JSON.stringify(task), { // Use res.json instead of new NextResponse
          status: 201
        })
      } catch (error) {

        console.log(error)
        return new Response(JSON.stringify({ error: "Failed to create task" }), { // Use res.json instead of new NextResponse
          status: 500
        })
      }
  }
  // If it is any other method, send a not allowed response with status code 405
  return new Response(JSON.stringify({ error: "Failed to create task" }), { // Use res.json instead of new NextResponse
    status: 201
  })
}
