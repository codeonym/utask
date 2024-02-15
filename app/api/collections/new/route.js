import { connectToDB } from "@utils/connectDB"
import Collection from "@models/Collection"
// Define the handler function for the API route
export const POST = async (req) => {

  // Check the request method
  switch (req.method) {

    // If it is a POST request, create a new task
    case 'POST':
      try {
        console.log("called");
        const {
          userId,
          title,
          description,
        } = await req.json()
        await connectToDB();

        const collection = new Collection({
          userId: userId,
          title: title,
          description: description,
        })
        // Save the collection to the database
        await collection.save()

        console.log(collection)
        // Send a success response with the task data and status code 201
        return new Response(JSON.stringify({ message: "Collection created successfully" }), { // Use res.json instead of new NextResponse
          status: 201
        })
      } catch (error) {

        console.log(error)
        return new Response(JSON.stringify({ error: "Failed to create collection" }), { // Use res.json instead of new NextResponse
          status: 500
        })
      }
  }
  // If it is any other method, send a not allowed response with status code 405
  return new Response(JSON.stringify({ error: "Failed to create collection" }), { // Use res.json instead of new NextResponse
    status: 201
  })
}
