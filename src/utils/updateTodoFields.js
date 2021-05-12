function updateTodoFields({ id, username, fields, users }) {
  return users.map((user, i) => {
    const userExists = user.username === username;

    if (userExists) {
      users[i] = {
        ...user,
        todos: user.todos.map((todo, j) => {
          const todoExists = todo.id === id;

          if (todoExists) {
            user.todos[j] = {
              ...todo,
              ...fields,
            };
          }

          return todo;
        }),
      };
    }

    return user;
  });
}

module.exports = updateTodoFields;
