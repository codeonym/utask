import { Schema, model, models } from "mongoose"

const TaskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: function () {
      return this.status !== 'done'
    },
    validate: {
      validator: function (value) {
        return value > Date.now()
      },
      message: 'Due date cannot be in the past'
    }
  },
  status: {
    type: String,
    enum: ['ongoing', 'done', 'missed'],
    default: 'ongoing'
  },
  todo: [{
    'title': {
      type: String,
      required: true
    },
    'status': {
      type: Boolean,
      default: false
    }
  }],
  labels: [
    {
      type: String,
      validate: {
        validator: function (value) {
          return value.length > 0
        },
        message: 'Labels cannot be empty'
      }
    }
  ],
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Collaborator'
    }
  ],
  reminders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reminder'
    }
  ],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
},
  {
  timestamps: true
})


const Task = models.Task || model("Task", TaskSchema)

export default Task
