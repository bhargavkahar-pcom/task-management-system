import { model, Schema, Types, type HydratedDocument } from "mongoose";

export const TASK_STATUSES = ["Pending", "In Progress", "Completed"] as const;

export const TASK_PRIORITIES = ["High", "Medium", "Low"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export interface ITask {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: TASK_STATUSES,
        message: "Invalid task status",
      },
      default: "Pending",
    },
    priority: {
      type: String,
      enum: {
        values: TASK_PRIORITIES,
        message: "Invalid task priority",
      },
      default: "Medium",
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type TaskDocument = HydratedDocument<ITask>;

const Task = model<ITask>("Task", taskSchema);
export default Task;
