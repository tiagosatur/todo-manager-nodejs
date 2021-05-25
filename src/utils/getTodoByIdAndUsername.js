function getTodoByIdAndUsername({ username, id, users }) {
  const getUser = users.find((user) => user.username === username);
  const todo = getUser.todos.find((todo) => todo.id === id);
  return todo;
}

module.exports = getTodoByIdAndUsername;
