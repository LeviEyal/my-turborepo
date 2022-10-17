import axios from "axios";

const DB_URL = "http://localhost:8000";

interface User {
	username: string;
	password: string;
}

const fetchUsers = async () => {
	const { data } = await axios.get(`${DB_URL}/users`);
	return data;
};

const fetchUser = async (username: string) => {
	const { data } = await axios.get<User[]>(`${DB_URL}/users?username=${username}`);
	return data.length > 0 ? data[0] : null;
};

const createUser = async (user: User) => {
	await axios.post(`${DB_URL}/users`, user);
};

export default {
	fetchUsers,
	fetchUser,
	createUser,
};
