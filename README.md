# api-server

Creating a server that provides a CRUD system using json-server package from npm.

Installing the package globally to your machine

```cmd
npm i -g json-server
npm i express
npm i -D jest
npm i -D supertest
npm i @types/jest
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

<p style="color:green; font-size:16px">Image For UML Routes</p>

### Swagger URL

[Swagger Link](https://app.swaggerhub.com/home)

### Routes Express

- Same end points and CRUD System as before for both products and categories

- adding tests for all the middleware we got in middleware directory .

- adding server that will handle all the routes from products and categories

- You can use Postman/Swagger to test the API.

- For now it is not connected to a data base, so each time you close the server all the records will be deleted

<p style="color:green; font-size:16px">Image For UML Routes</p>
