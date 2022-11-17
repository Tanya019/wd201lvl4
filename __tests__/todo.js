const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: today,
    });
  });
  test("Should add new todo", () => {
    add(
      {
        title: "Play tennis",
        completed: false,
        dueDate: tomorrow,
        //console.log(dueDate),
      },
      {
        title: "Buy milk packet",
        completed: false,
        dueDate: yesterday,
      }
    );
    const todoItemCount = all.length;
    add({
      title: "Complete bootcamp",
      completed: false,
      dueDate: yesterday,
    });

    expect(all.length).toBe(todoItemCount + 1);
  });
  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Should check retrieval of overdue items", () => {
    ta = overdue();
    expect(all[2].dueDate).toBe(ta[0]["dueDate"]);
  });
  test("Should check retrieval of duetoday items", () => {
    ta = dueToday();
    expect(all[0].dueDate).toBe(ta[0]["dueDate"]);
  });
  test("Should check retrieval of due later items", () => {
    ta = dueLater();
    expect(all[1].dueDate).toBe(ta[0]["dueDate"]);
  });
});
