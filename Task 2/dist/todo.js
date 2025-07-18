"use strict";
let todo = [];
const createTodo = (title) => {
    const newTodo = {
        id: todo.length + 1,
        title,
        completed: false,
    };
    todo.push(newTodo);
    return newTodo;
};
const fetchTodos = () => {
    return todo;
};
const markTodoComplete = (id) => {
    let foundTodo = todo.find((todo) => todo.id === id);
    if (foundTodo) {
        foundTodo.completed = true;
        return foundTodo;
    }
    return null;
};
const removeTodo = (id) => {
    const index = todo.findIndex((todo) => todo.id === id);
    if (index !== -1) {
        todo.splice(index, 1);
        return true;
    }
    return false;
};
// menu to use
const todoMenu = () => {
    console.log("Todo List Menu:");
    console.log("1. Add Todo");
    console.log("2. View Todos");
    console.log("3. Complete Todo");
    console.log("4. Delete Todo");
    console.log("5. Exit");
    const choice = prompt("Enter your choice: ");
    switch (choice) {
        case "1":
            const title = prompt("Enter todo title: ");
            if (title) {
                const todo = createTodo(title);
                console.log(`Added Todo: ${todo.title}`);
            }
            break;
        case "2":
            const allTodos = fetchTodos();
            console.log("Current Todos:");
            allTodos.forEach((todo) => {
                console.log(`${todo.id}. ${todo.title} [${todo.completed ? "Completed" : "Pending"}]`);
            });
            break;
        case "3":
            const completeId = parseInt(prompt("Enter Todo ID to complete: ") || "0");
            const completedTodo = markTodoComplete(completeId);
            if (completedTodo) {
                console.log(`Completed Todo: ${completedTodo.title}`);
            }
            else {
                console.log("Todo not found.");
            }
            break;
        case "4":
            const deleteId = parseInt(prompt("Enter Todo ID to delete: ") || "0");
            if (removeTodo(deleteId)) {
                console.log("Todo deleted successfully.");
            }
            else {
                console.log("Todo not found.");
            }
            break;
        case "5":
            console.log("Exiting...");
            return;
        default:
            console.log("Invalid choice. Please try again.");
    }
};
todoMenu();
