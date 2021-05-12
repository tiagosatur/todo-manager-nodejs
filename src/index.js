const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const updateTodoFields = require("./utils/updateTodoFields");
const getTodoByIdAndUsername = require("./utils/getTodoByIdAndUsername");

const app = express();

app.use(cors());
app.use(express.json());

let users = [
  {
    id: uuidv4(),
    name: "Will Vieira",
    username: "will",
    todos: [
      {
        id: uuidv4(),
        title: "Take the cat for a walk",
        deadline: new Date().getTime(),
        done: false,
        created_at: new Date().getTime(),
      },
    ],
  },
];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const usernameExists = users.some((user) => user.username === username);

  if (!usernameExists) {
    return response.status(400).send({
      success: false,
      message: "User doesn't exist",
    });
  }
  request.body.username = username;
  next();
}

app.get("/users", (request, response) => {
  return response.status(200).send(users);
});

app.post("/users", (request, response) => {
  const { name, username } = request.body;
  const usernameExists = users.some((user) => user.username === username);

  if (!name || !username || usernameExists) {
    return response.status(400).send({
      success: false,
      message: usernameExists
        ? "Username already exists. Choose another one."
        : "You need to pass name and username",
    });
  }

  users = users.concat({
    id: uuidv4(),
    name,
    username,
    todos: [],
  });

  return response.status(200).send({
    success: true,
    users,
  });
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { username } = request.body;
  const { todos } = users.find((user) => user.username === username);

  return response.status(200).send({
    ...todos,
  });
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { username, title, deadline } = request.body;
  const user = users.find((user) => user.username === username);
  const otherUsers = users.filter((user) => user.username !== username);

  const newTodo = {
    id: uuidv4(),
    title,
    deadline,
    done: false,
    created_at: new Date().getTime(),
  };
  const updatedUserTodos = {
    ...user,
    todos: [...user.todos, newTodo],
  };
  users = otherUsers.concat(updatedUserTodos);

  return response.status(200).send({
    success: true,
    todo: newTodo,
  });
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  const {
    body: { title, deadline, username },
    params: { id },
  } = request;

  if (!id || !title || !deadline) {
    return response.status(400).send({
      success: false,
      message: "id, title, deadline fields are required.",
    });
  }

  users = updateTodoFields({
    id,
    username,
    fields: {
      title,
      deadline,
    },
    users,
  });

  const updatedTodo = getTodoByIdAndUsername({ id, username, users });

  return response.status(200).send({
    success: true,
    todo: updatedTodo,
  });
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  const {
    body: { username },
    params: { id },
  } = request;

  if (!id) {
    return response.status(400).send({
      message: "id is a required route param",
    });
  }

  users = updateTodoFields({
    id,
    username,
    fields: {
      done: true,
    },
    users,
  });

  const doneTodo = getTodoByIdAndUsername({ id, username, users });

  return response.status(200).send({
    ...doneTodo,
  });
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  const {
    body: { username },
    params: { id },
  } = request;

  if (!id) {
    return response.status(400).send({
      message: "todo id is required",
    });
  }

  const deleteTodoFromUser = users.map((user, i) => {
    const findUser = user.username === username;
    if (findUser) {
      users[i] = {
        ...user,
        todos: user.todos.filter((todo) => todo.id !== id),
      };
    }
    return user;
  });

  users = deleteTodoFromUser;

  return response.status(200).send({
    message: "Todo deleted succefully!",
  });
});

module.exports = app;
