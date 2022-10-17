import { useServerState } from "./hooks/useResource";

export const Counter = () => {
  const [counter, dispatch, isLoading, error] = useServerState<number>(
    "http://localhost:5000/counter"
  );

	const increment = () => dispatch({ type: "increment" });
	const decrement = () => dispatch({ type: "decrement" });

  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}