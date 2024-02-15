import { Schema, model, models } from "mongoose"


const CollaboratorSchema = new Schema({
  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['owner', 'contributor'],
    default: 'contributor'
  },
})


const Collaborator = models.Collaborator || model("Collaborator", CollaboratorSchema)

export default Collaborator