import express, {Request, Response, NextFunction} from "express";
import morgan from "morgan";
import cors from "cors";
import api from "./api/api";
import crypto from "crypto";
import jwt from "jsonwebtoken";

function getEnvs(...keys: string[]): {[key: string]: string} {
    const res: {[key: string]: string} = {};
    for (const key of keys) {
        const val = process.env[key];
        if (!val) {
            throw new Error(`Environment variable ${key} is not defined`);
        } else {
            res[key] = val;
        }
    }
    return res;
}

const {NODE_ENV} = getEnvs('NODE_ENV');

const app = express();

//Core middlewares
app.use(morgan("dev")).use(cors()).use(express.json());

app.get("/", (req, res) => {
	res.send("Auth service");
});

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, 'secret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await api.fetchUser(username as string);
    if (!user) {
        return res.status(404).send("User not found");
    }
    const hash = crypto.createHash("sha256");
    hash.update(password as string);
    const hashedPassword = hash.digest("hex");
    if (user.password !== hashedPassword) {
        return res.status(401).send("Password is incorrect");
    }
    const token = jwt.sign({ username: user.username }, "secret");
    res.send(token);
});

app.get('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await api.fetchUser(username);
    if (user) {
        return res.status(409).send('User already exists');
    }
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const newUser = {
        username,
        password: hashedPassword
    };
    await api.createUser(newUser);
    return res.status(201).send('User created');
});

app.get('/users', async (req, res) => {
    const users = await api.fetchUsers();
    return res.send(users);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT} in ${NODE_ENV} mode.`);
});
