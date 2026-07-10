export default function TaskItem(task) {
  return (`
    <li class="task ${task.done ? "is-done" : ""}" data-id="${task.id}">
      <button class="check" data-action="toggle">
        ${renderIf(task.done, icons.check)}
      </button>
      <span class="text">${task.text}</span>
      <button class="remove" data-action="delete" aria-label="Delete task">
        ${icons.trash}
      </button>
    </li>
  `);
}