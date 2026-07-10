import taskTracker from "/js/layouts/taskTracker/assemble.js";

export default function TaskTracker () {
  // Rendering
  sH(task_tracker, taskTracker.UI);

  // Initiate Functions
  taskTracker.logic();
}