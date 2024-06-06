import express, {request, response} from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id: 1, name: "John", email: "john@example.com"},
    {id: 2, name: "Johan", email: "johan@example.com"},
    {id: 3, name: "Jane", email: "jane@example.com"},
];

const otherUsers = [
    { id: 1, username: "John", displayName: "Johnny"},
    { id: 2, username: "Johan", displayName: "Johans"},
    { id: 3, username: "Jane", displayName: "Jannie"},
    { id: 4, username: "Joe", displayName: "Bangz"},
    { id: 5, username: "Jones", displayName: "JK"},
];

const mockProducts = [
    {id: 1, name: "chicken breast", price: "12.99"},
    {id: 2, name: "beer", price: "12.99"},
    {id: 3, name: "bread", price: "12.99"},
]

app.get("/", (request, response) => {
    response.status(201).send({"Msg": "Hello world"});
})

app.get("/api/users", (request, response) => {
    response.send(mockUsers);
});

app.get("/api/otherUsers", (request, response) => {
    console.log(request.query);

    const {
        query: {filter, value}
    } = request;

    if (filter && value) {
        return response.send(
            otherUsers.filter((user) => user[filter].includes(value)));
    } else {
        return response.send(otherUsers);
    }

})

app.get("/api/users/:id", (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);

    if (isNaN(parsedId))
        return response.status(400).send({"Msg": "Bad Request, Invalid ID"});

    const foundUser = mockUsers.find((user) => user.id === parsedId);
    if (!foundUser)
        return response.status(404).send({"Msg": "User Not Found"});
    return response.send(foundUser);
})

app.get("/api/products", (request, response) => {
    response.send(mockProducts)
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});