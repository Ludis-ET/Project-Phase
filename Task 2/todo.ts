interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

let todos: TodoItem[] = [];

const createTodo = (title: string): TodoItem => {
  const newTodo: TodoItem = {
    id: Date.now(),
    title,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

const fetchTodos = (): TodoItem[] => todos;

const markTodoComplete = (id: number): TodoItem | null => {
  const found = todos.find((todo) => todo.id === id);
  if (found) {
    found.completed = true;
    return found;
  }
  return null;
};

const editTodo = (id: number, newTitle: string): TodoItem | null => {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.title = newTitle;
    return todo;
  }
  return null;
};

const removeTodo = (id: number): boolean => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    return true;
  }
  return false;
};

// Example usage
console.log("Created:", createTodo("Learn TypeScript"));
console.log("Created:", createTodo("Build Todo App"));

console.log("All Todos:", fetchTodos());

console.log("Completed:", markTodoComplete(todos[0].id));
console.log("Edited:", editTodo(todos[1].id, "Build Awesome Todo App"));

console.log("Deleted:", removeTodo(todos[0].id));
console.log("Remaining Todos:", fetchTodos());
