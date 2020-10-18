# api-server

Creating a server that provides a CRUD system using json-server package from npm.

Installing the package globally to your machine

```cmd
npm i -g json-server
```

Start the server

```cmd
json-server --id=_id --watch <path to db file> --routes <path to routes file>
```

### End Points

- /categories
- /products

### CRUD

<p style="color:red; font-size:20px">Same for the products</p>

- GET ALL: GET - /categories
- GET SOME: GET - /categories?category=electronics
- GET ONE: GET - /categories/1
- UPDATE ONE: PATCH or PUT - /categories/1
- DELETE ONE: DELETE - /categories/1

### Swagger URL

[Swagger Link](https://app.swaggerhub.com/home)
