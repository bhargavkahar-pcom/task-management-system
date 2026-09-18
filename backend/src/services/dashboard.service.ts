import Task, { TASK_STATUSES } from "@models/task.model.js";

interface DashboardStatistics {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

const getDashboardStatistics = async (): Promise<DashboardStatistics> => {
  const currentDate = new Date();

  const [total, pending, inProgress, completed, overdue] = await Promise.all([
    Task.countDocuments(),

    Task.countDocuments({
      status: TASK_STATUSES[0],
    }),

    Task.countDocuments({
      status: TASK_STATUSES[1],
    }),

    Task.countDocuments({
      status: TASK_STATUSES[2],
    }),

    Task.countDocuments({
      dueDate: {
        $lt: currentDate,
      },
      status: {
        $ne: "Completed",
      },
    }),
  ]);

  return {
    total,
    pending,
    inProgress,
    completed,
    overdue,
  };
};

export default { getDashboardStatistics };
