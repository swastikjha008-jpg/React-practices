import { useRecoilState } from "recoil";
import { userSelector, todosSelector } from "../atom";

function TodoItem({ id }) {
  const [todo, setTodo] = useRecoilState(todoAtomFamily(id));

  return (
    <div>
      <input
        type="text"
        value={todo.text}
        onChange={(e) => setTodo({ ...todo, text: e.target.value })}
        placeholder={`Todo ${id}`}
      />
      <button onClick={() => setTodo({ ...todo, done: !todo.done })}>
        {todo.done ? "✅ Done" : "⬜ Mark done"}
      </button>
    </div>
  );
}

export default function TodoList() {
  return (
    <div>
      <h2>Todo List (atomFamily)</h2>
      {[1, 2, 3, 4, 5].map((id) => (
        <TodoItem key={id} id={id} />
      ))}
    </div>
  );
}