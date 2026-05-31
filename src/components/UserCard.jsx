import { useRecoilValueLoadable, useRecoilStateLoadable } from "recoil";
import { userSelector, todosSelector } from "../atom";

export function UserCard() {
  const loadable = useRecoilValueLoadable(userSelector);

  if (loadable.state === "loading") return <p>Loading user...</p>;
  if (loadable.state === "hasError") return <p>Error: {loadable.contents.message}</p>;

  const user = loadable.contents;
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.address.city}</p>
    </div>
  );
}

export function UserSwitcher() {
  const [loadable, setUserId] = useRecoilStateLoadable(userSelector);

  return (
    <div>
      <button onClick={() => setUserId(1)}>User 1</button>
      <button onClick={() => setUserId(2)}>User 2</button>
      <button onClick={() => setUserId(3)}>User 3</button>

      {loadable.state === "loading"  && <p>Fetching...</p>}
      {loadable.state === "hasError" && <p>Something went wrong</p>}
      {loadable.state === "hasValue" && <h2>{loadable.contents.name}</h2>}
    </div>
  );
}

export function UserTodos({ userId }) {
  const loadable = useRecoilValueLoadable(todosSelector(userId));

  if (loadable.state === "loading")  return <p>Loading todos...</p>;
  if (loadable.state === "hasError") return <p>Failed to load todos</p>;

  return (
    <ul>
      {loadable.contents.map((todo) => (
        <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}