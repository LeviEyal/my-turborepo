"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
let counter = 0;
let todos = [];
//Core middlewares
app.use((0, morgan_1.default)("dev")).use((0, cors_1.default)()).use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!!!");
});
app
    .post("/counter", (req, res) => {
    const { type } = req.body;
    if (type === "decrement") {
        counter--;
    }
    else {
        counter++;
    }
    res.send({ state: counter });
})
    .get("/counter", (req, res) => {
    res.send({ state: counter });
});
app.get("/todos", (req, res) => {
    res.send({ state: todos });
}).post("/todos", (req, res) => {
    const { type, payload } = req.body;
    if (type === "add") {
        todos.push({ id: todos.length, text: payload.text });
    }
    else if (type === "remove") {
        todos = todos.filter((todo) => todo.id !== payload);
    }
    res.send({ state: todos });
});
app.get("/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (todo) {
        res.send({ state: todo });
    }
    else {
        res.status(404).send({ error: "Not found" });
    }
}).post("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { type, payload } = req.body;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (todo) {
        if (type === "update") {
            todo.text = payload.text;
        }
        res.send({ state: todo });
    }
    else {
        res.status(404).send({ error: "Not found" });
    }
});
const { PORT = 5000, NODE_ENV } = process.env;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} in ${NODE_ENV} mode.`);
});
