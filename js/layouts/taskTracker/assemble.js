import TaskItem from "./components/TaskItem.js";
 
export default {
  UI: (`
    <header class="head">
      <p class="eyebrow">collie.js — demo</p>
      <h1>$ task-tracker</h1>
    </header>

    <form class="add-row" id="add-form">
      <input type="text" id="task-input" placeholder="add a task and hit enter" autocomplete="off" />
      <button type="submit" class="add-btn">${icons.plus}</button>
    </form>

    <div class="filters" id="filters">
      <button data-filter="all" class="is-active">all</button>
      <button data-filter="active">active</button>
      <button data-filter="done">done</button>
    </div>

    <ul id="task-list"></ul>

    <p id="empty-state" class="empty"></p>

    <button id="clear-done" class="clear">clear completed</button>
  `),

  logic: () => {
    // state — lives inside this section, since no other section needs it
    const tasks = createState([
      { id: 1, text: "Learn collie.js", done: true },
      { id: 2, text: "Build a demo project", done: false },
      { id: 3, text: "Never write a class component", done: false },
    ]);
    
    const filter = createState("all");

    // refs
    const formRef = tE("#add-form");
    const inputRef = tE("#task-input");
    const listRef = tE("#task-list");
    const emptyRef = tE("#empty-state");
    const clearRef = tE("#clear-done");
    const filterBtns = tEs("#filters button");

    // cE in action — this badge isn't part of the original UI string,
    // it's created and inserted on the fly, then updated every render
    const statsBadge = cE("span", "stats-badge");
    tE(".head").appendChild(statsBadge);

    function getVisibleTasks() {
      const all = tasks.get();
      const current = filter.get();
      if (current === "active") return all.filter(t => !t.done);
      if (current === "done") return all.filter(t => t.done);
      return all;
    }

    function render() {
      const visible = getVisibleTasks();
      const all = tasks.get();

      sH(listRef, renderList(visible, TaskItem));
  
      sH(emptyRef, renderIf(
        visible.length === 0,
        "Nothing here. Add a task above."
      ));

      const doneCount = all.filter(t => t.done).length;
      sH(statsBadge, `${doneCount}/${all.length} done`);
  
      const hasDone = doneCount > 0;
      clearRef.style.display = hasDone ? "inline-block" : "none";
    }

    addEvent(formRef, "submit", (e) => {
      e.preventDefault();
      const text = inputRef.value.trim();
      if (!text) return;

      tasks.set([...tasks.get(), { id: Date.now(), text, done: false }], render);
      inputRef.value = "";
    });

    // one listener handles every task — toggle and delete, no matter how many tasks exist
    addEvent(listRef, "click", (e) => {
      const li = e.target.closest(".task");
      if (!li) return;

      const id = Number(li.dataset.id);
      const actionTarget = e.target.closest("[data-action]");
      const action = actionTarget ? actionTarget.dataset.action : null;

      if (action === "toggle") {
        tasks.set(
          tasks.get().map(t => t.id === id ? { ...t, done: !t.done } : t),
          render
        );
      }

      if (action === "delete") {
        tasks.set(tasks.get().filter(t => t.id !== id), render);
      }
    });

    filterBtns.forEach(btn => {
      addEvent(btn, "click", () => {
        filterBtns.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        filter.set(btn.dataset.filter, render);
      });
    });

    addEvent(clearRef, "click", () => {
      tasks.set(tasks.get().filter(t => !t.done), render);
    });

    render();
  }
}