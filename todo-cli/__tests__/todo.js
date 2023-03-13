const todoList = require("../todo.js");
const { add, all, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todo List Test Suite", () => {
  beforeAll(() => {
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    [
      {
        title: "Task 1",
        completed: false,
        dueDate: new Date(today.getTime() - 3 * oneDay).toLocaleDateString(
          "en-CA"
        ),
      },
      {
        title: "Task 2",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "Task 3",
        completed: false,
        dueDate: new Date(today.getTime() + 3 * oneDay).toLocaleDateString(
          "en-CA"
        ),
      },
    ].forEach(add);
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;

    add({
      title: "Test 4",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });
  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });
  test("Should retrieve overdue items", () => {
    expect(overdue().length).toEqual(1);
  });
  test("Should retrieve due today items", () => {
    expect(dueToday().length).toEqual(2);
  });
  test("Should retrieve due later items", () => {
    expect(dueLater().length).toEqual(1);
  });
});
