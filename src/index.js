const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

let users = [
  {
    id: uuidv4(),
    name: "Danilo Vieira",
    username: "danilo",
    todos: [],
  },
];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const usernameExists = users.some((user) => user.username === username);

  if (!usernameExists) {
    return response.send(400, {
      success: false,
      message: "User doesn't exist",
    });
  }

  next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;
  const usernameExists = users.some((user) => (user.username = username));

  if (!name || !username || usernameExists) {
    return response.send(400, {
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

  return response.send(200, {
    success: true,
    users,
  });
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  // Complete aqui
  console.log("🚀 ~ app.post ~ request", request.userId);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
