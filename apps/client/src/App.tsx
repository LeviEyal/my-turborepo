import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useServerState } from "./hooks/useResource";
import { Counter } from "./Counter";
import { TodoList } from "./TodoList";

const queryClient = new QueryClient();

const API_URL = "http://localhost:5000";

// const useCounter = () => {
// 	const { data, isLoading, error, refetch } = useQuery(["counter"], () =>
// 		axios.get(`${API_URL}/counter`)
// 	);
// 	const { mutate } = useMutation(
// 		["counter"],
// 		(value: number) => axios.post(`${API_URL}/counter`, { value }),
// 		{
// 			onSuccess: () => {
// 				queryClient.invalidateQueries(["counter"]);
// 				refetch();
// 			},
// 		}
// 	);

// 	const counter = data?.data?.counter ?? 0;
// 	return {
// 		counter,
// 		isLoading,
// 		error,
// 		increment: () => mutate(1),
// 		decrement: () => mutate(0),
// 	};
// };

type Counter = number;

function App() {
	// const { counter, isLoading, error, increment, decrement } = useCounter();
	const [counter, dispatch, isLoading, error] = useServerState<number>(
		"http://localhost:5000/counter"
	);

	const increment = () => dispatch({ type: "increment" });
	const decrement = () => dispatch({ type: "decrement" });

	// if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Something went wrong</div>;

	return (
		<div className="App">
			<TodoList />
			<div>
				<Counter />
			</div>
			<h1>Counter: {counter}</h1>
			<div className="card">
				<button onClick={increment}>Increment</button>
				<button onClick={decrement}>Decrement</button>
      </div>
      <TodoList />
		</div>
	);
}

export default App;
