# Todo manager NodeJS API :star2:

This is a rest api todo manager where you can add and get users; and you can get, update and delete a todo passing the username in the headers and the todo id as a route param.

## Run :running:

`yarn install`

`yarn dev`

## Stack :bowtie:

- Javascript
- NodeJS
- ExpressJS
- Nodemon
- Yarn
- uuid

## Concepts :bulb:

- Rest API
- HTTP Methods
- Route middlewares
- Separation of concerns
- JSON

## Requirements :heavy_check_mark:

[Notion requirements](https://www.notion.so/Desafio-01-Conceitos-do-Node-js-59ccb235aecd43a6a06bf09a24e7ede8)

- [x] It must be possible to create an user account
- [x] It must be possible to get users
- [x] It must be possible to add a todo
- [x] It must be possible to update a todo
- [x] It must be possible to check a todo as done
- [x] It must be possible to delete a todo

## Business rules :briefcase:

- [x] It must not be possible to register user with the same username
- [x] It must not be possible to create a todo in a non existing user
- [x] It must not be possible to create a todo without passing title and deadline in the body of the request
- [x] It must not be possible update an non existing todo
- [x] It must be possible update just the todo title and deadline fields
- [x] It must not be possible to mark a non existing todo as done
- [x] It must not be possible to delete non existings todo

## API Documentation :page_with_curl:

Base url: `http://localhost:3333`

| Method | Route             | Headers  | Body                                                                        | Parameters | Return                                        |
| ------ | ----------------- | -------- | --------------------------------------------------------------------------- | ---------- | --------------------------------------------- |
| GET    | `/users`          | -        |                                                                             | -          | Array with users                              |
| POST   | `/users`          | -        | <pre lang="json">{ "name": "Joseph Satur", "username": "joseph" }</pre>     | -          | Object: id, name, username, todos[]           |
| GET    | `/todos`          | username | -                                                                           | -          | Array of todos                                |
| POST   | `/todos`          | username | <pre lang="json">{ "title": "Go shopping", "deadline": "2021-06-15" }</pre> | -          | Object: id, title, deadline, done, created_at |
| PUT    | `/todos`          | username | <pre lang="json">{ "title": "Sell Golf", "deadline": 2021-05-23 }</pre>     | -          | Object: id, title, deadline, done, created_at |
| PATCH  | `/todos/:id/done` | username | -                                                                           | -          | Object: id, title, deadline, done, created_at |
| DELETE | `/todos/:id`      | username | -                                                                           | -          | 200/400                                       |
