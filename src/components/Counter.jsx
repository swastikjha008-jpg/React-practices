import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userSelector, todosSelector } from "../atom";

function CounterDisplay() {
  const count = useRecoilValue(countAtom);
  const double = useRecoilValue(doubleCountSelector);
  return (
    <div>
      <h2>Count: {count}</h2>
      <h3>Double: {double}</h3>
    </div>
  );
}

function CounterButtons() {
  const [count, setCount] = useRecoilState(countAtom);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}

function ResetButton() {
  const setCount = useSetRecoilState(countAtom);
  return <button onClick={() => setCount(0)}>Reset</button>;
}

export default function Counter() {
  return (
    <div>
      <CounterDisplay />
      <CounterButtons />
      <ResetButton />
    </div>
  );
}