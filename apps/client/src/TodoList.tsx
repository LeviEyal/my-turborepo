import { useServerState } from "./hooks/useResource";

interface Todo {
	id: number;
	text: string;
}
interface TodoItemProps {
	todo: Todo;
	onRemove: (id: number) => void;
}

const TodoItem = ({ todo, onRemove }: TodoItemProps) => {
  const [_, dispatch, isLoading, error] = useServerState<Todo>(
		`http://localhost:5000/todos/${todo.id}`
  );
  
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "update", payload: 'e.target.value' });
  };

	return (
		<li key={todo.id}>
			<input type="text" value={todo.text} onChange={change}/>
			<button onClick={() => onRemove(todo.id)}>Remove</button>
		</li>
	);
};

type TodoList = Todo[];

export const TodoList = () => {
	const [todos, dispatch, isLoading, error] = useServerState<TodoList>(
		"http://localhost:5000/todos"
	);

	const onRemove = (id: number) => dispatch({ type: "remove", payload: id });
	const add = () => dispatch({ type: "add", payload: { text: "New todo" } });

	if (error || !todos)
		return <div>Something went wrong: {JSON.stringify(error)}</div>;

	return (
		<div>
			<button onClick={add}>Add</button>
			<h1>Todos</h1>
			<ul>
				{todos?.map((todo) => (
					<TodoItem todo={todo} onRemove={onRemove} />
				))}
			</ul>
		</div>
	);
};
