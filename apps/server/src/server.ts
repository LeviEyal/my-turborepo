import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

let counter: number = 0;

interface Todo {
	id: number;
	text: string;
}
let todos: Todo[] = [];

//Core middlewares
app.use(morgan("dev")).use(cors()).use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!!!!");
});

app
	.post("/counter", (req, res) => {
		const { type } = req.body;
		if (type === "decrement") {
			counter--;
		} else {
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
    } else if (type === "remove") {
        todos = todos.filter((todo) => todo.id !== payload);
    }
    res.send({ state: todos });
});

app.get("/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (todo) {
        res.send({ state: todo });
    } else {
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
    } else {
        res.status(404).send({ error: "Not found" });
    }
});

const { PORT = 5000, NODE_ENV } = process.env;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT} in ${NODE_ENV} mode.`);
});
