import fs from "fs";

const todoPath = "todos.json";

type Todo = {
  id: number;
  task: string;
};

function getTodos(): Todo[] {
  if (!fs.existsSync(todoPath)) {
    return [];
  }
  const data = fs.readFileSync(todoPath, "utf-8");
  return JSON.parse(data.toString()) as Todo[];
}

function listTodos(): void {
  const todos: Todo[] = getTodos();
  todos.forEach((todo) => {
    console.log(`${todo.id}: ${todo.task}`);
  });
}

function saveTodos(todos: Todo[]): void {
  fs.writeFileSync(todoPath, JSON.stringify(todos));
}
function removeTodo(id: number): void {
  const todos: Todo[] = getTodos();
  //   const filteredTodos = todos.filter((todo) => todo.id !== id);
  //   saveTodos(filteredTodos);

  // id : 3 1 7
  //  index : 0, 1,2
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    console.log(`Todo with id ${id} not found.`);
    return;
  }
  const removedTodo = todos.splice(index, 1)[0];
  saveTodos(todos);
  console.log(`Removed todo: ${removedTodo.id}: ${removedTodo.task}`);
}
function addTodo(task: string): void {
  const todos: Todo[] = getTodos();
  const newTodo: Todo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    task: task,
  };
  todos.push(newTodo);
  saveTodos(todos);
  console.log(`Added todo: ${newTodo.id}: ${newTodo.task}`);
}

function cliInvalidOption(command: string): void {
  console.error(`Invalid number of options for subcommand "${command}" `);
}

function cli(): void {
  const subcommand = process.argv[2];
  const options = process.argv.slice(3);
  switch (subcommand) {
    case "--help":
      console.log("todo add TASK      add todo");
      console.log("todo done ID       complete a todo");
      console.log("todo list          list todos");
      break;
    case "add":
      if (options.length === 1) {
        addTodo(options[0]);
      } else {
        cliInvalidOption("add");
      }
      break;
    case "done":
      if (options.length === 1) {
        const id = parseInt(options[0], 10);
        if (!isNaN(id)) {
          removeTodo(id);
        } else {
          console.log("Invalid ID for subcommand 'done'");
        }
      } else {
        cliInvalidOption("done");
      }
      break;
    case "list":
      if (options.length !== 0) {
        cliInvalidOption("list");
        break;
      }
      listTodos();
      break;
    default:
      console.log("Unknown subcommand. Use '--help' for usage information.");
      break;
  }
}

cli();
