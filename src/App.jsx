import { RecoilRoot } from "recoil";
import Counter from "./components/Counter";
import TodoList from "./components/TodoList";
import { UserCard, UserSwitcher, UserTodos } from "./components/UserCard";

export default function App() {
  return (
    <RecoilRoot>
      <h1>Recoil Practice</h1>

      <section>
        <h2>1. Counter</h2>
        <Counter />
      </section>

      <section>
        <h2>2. Todo List</h2>
        <TodoList />
      </section>

      <section>
        <h2>3. User Card</h2>
        <UserCard />
      </section>

      <section>
        <h2>4. User Switcher</h2>
        <UserSwitcher />
      </section>

      <section>
        <h2>5. User Todos</h2>
        <UserTodos userId={1} />
        <UserTodos userId={2} />
      </section>
    </RecoilRoot>
  );
}